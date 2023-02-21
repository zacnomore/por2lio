---
title: Progressive Web App Podcast Client
description: Exploration of PWA technologies
slug: pwa-podcatcher
date: 2019-11
technologies: Angular, TypeScript, PWA, Angular Material, IDB, RxJS
repository: https://github.com/zacnomore/pwa-podcatcher
site: https://pwa-podcatcher-nine-black.now.sh/
published: true
---

## What

Podcast client (AKA podcatcher) that supports search and audio streaming

## Why

Progressive web apps have invited web developers into phones in a new way by allowing users to add their favorite sites to their home screen. While the core concept behind PWAs is _progressive_, layers of modern functionality on top of the backwards compatible foundation, using these new features of the foundation can create a categorically different experience but with the caveat of excluding those without a modern browser.

To demonstrate this, I built a podcast client with features that couldn't otherwise exist on a web app. Improved storage persistence for holding onto podcast subscriptions locally, home-screen install for app-like access, offline functionality to listen to downloaded episodes, push notifications for download notifications, and caching of key resources to allow UI to maintain app-like responsiveness.

## How

This app has a thick client and just a sprinkling of serverless functions to get through the CORS requirements of the podcast ecosystem.

Starting at the bottom of the stack, the serverless functions provide search and feed reading. For search, there's a number of podcast directories these days but iTunes is the defacto standard. The iTunes search API provides the podcast listings with enough data to reach their individual feeds. The episodes feeds themselves also conform to the iTunes standards, they are XML RSS feeds with meta information and the mp3 urls.

> In order to keep processing cheap enough to utilize the free tier of Zeit I transform and map the XML in the client but in a production app I would want to do that processing server side. After the first request that processing would be free due to caching and would reduce the bundle size of the client by quite a bit. The xml2js package is a bit hefty after all.

Sitting between all those requests and the rest of the application is the all important service worker. This system allows us to create a cached, offline-capable application that can be installed on mobile devices similar to a native app.

The service worker cache is helpful for data from the network, the client specific data lands in persistent storage. IndexedDB is used for asynchronous storage of feeds and episodes.

RxJS observables provide single source of truth, always up to date view models for maintaining a internally-consistent app state.

> While a redux-style solution like NGRX could just as easily maintain that app state (not to mention be super cool and trendy), I wanted to spin up something smaller for a couple reasons. I wanted to maintain focus on the core technologies and build those systems on my own to build the best understanding. The store persistence was one of those places. Additionally, for an app of this size that seemed to be a sledgehammer for a nail.

I utilized the Material component library for this project as I didn't want to get too caught up in the UI. The focus here is on the new UX possibilities of PWAs, not how cool I can style my buttons.

## What I learned

While I enjoyed delving deeper into some of the most interesting client-side tech, I actually spent a lot of time thinking about state management. I wanted to fully utilize the data once it had arrived so I worked hard to share it as much as possible. I felt that using a state management solution would detract from the focus and the general approach of [lifting state up](https://reactjs.org/docs/lifting-state-up.html) in the component hierarchy wouldn't properly share the data like I was hoping to. I made a custom store for sharing across routes and a thoroughly designed state reading system for managing the `Audio` instance.

I emerged with an understanding of the state management problem in general but not a strong opinion on the solutions yet. I expect to search for more answers on this for a while, I'm not very pleased with Flux or its alternatives.

## Some Interesting Code

I absolutely had a bit too much fun with rxjs in here but I think it came out rather elegant! The code is available in full on [Github](https://github.com/zacnomore/pwadcatcher/blob/master/src/app/player/services/audio-player.service.ts) but I have summarized and annotated it here for your enjoyment.

```typescript
// This will be our source of truth. The `audioState$` observable is public and exposes this
// information in a constantly correct fashion
export interface IAudioState {
  isPlaying: boolean;
  canPlay: boolean;
  currentTime: number;
  duration: number;
}


export class AudioPlayerService {
  private readonly audio = new Audio();

  // This allows triggering the various actions through friendly enums
  private audioActions = new Map<PlayerAction, (el: HTMLAudioElement, params?: number) => void>([
    [PlayerAction.Play, el => el.play()],
    [PlayerAction.Pause, el => el.pause()],
    [PlayerAction.SkipNext, () => this.playlistService.changeEpisode({ indexShift: 1 })],
    [PlayerAction.SkipPrevious, () => this.playlistService.changeEpisode({ indexShift: -1 })],
    [PlayerAction.FastForward, el => el.currentTime += 10],
    [PlayerAction.FastRewind, el => el.currentTime -= 10],
    [PlayerAction.Seek, (el, params) => params ? el.currentTime = params : undefined ]
  ]);

  // A big part of this application is offline resumability so occasionally storing the audio state
  // allows the user to come back to where they were whether on a refresh or something longer
  private storeAudioState = throttle((state: IAudioState, episode: IPodcastEpisode) => {
    this.storeService.setEpisode({
      ...episode,
      lastPlayheadPosition: state.currentTime
    });
  }, 4000);

  // This is most of the magic. We want to listen for our own events but also the audio
  // objects events too. This is how we know things like the audio is loading or has finished playing
  public audioState$: Observable<IAudioState> = this.playlistService.currentEpisode$.pipe(
    // Side-effect sets the native audio player
    tap(currentEp => this.loadAudio(currentEp)),
    // Listen to the native player's state
    switchMap((currentEp) => {
      return this.listenToState(this.audio).pipe(
        startWith({
          canPlay: false,
          currentTime: 0,
          duration: NaN,
          isPlaying: false
        } as IAudioState),
        map(audio => ({audio, currentEp}))
      );
    }),
    // Persist playhead state
    tap(({audio, currentEp}) => {
      if(currentEp) {
        this.storeAudioState(audio, currentEp);
      }
    }),
    map(({audio}) => audio),
    shareReplay(1)
  );

  private loadAudio(episode: IPodcastEpisode | null): void {
    if (episode) {
      this.audio.src = episode.audioUrl;
      this.audio.load();
      if(episode.lastPlayheadPosition) {
        this.audio.currentTime = episode.lastPlayheadPosition;
      }
      this.audio.play();
    } else {
      this.audio.src = '';
    }
  }

  // I've excised the handler functions but suffice to say this is made to concentrate all those
  // external side-effects from the playing into simple `IAudioState` property changes
  private listenToState(audio: HTMLAudioElement): Observable<IAudioState> {
    const eventPlans: IEventPlanning[] = [
      { name: 'canplay', handler: this.staticHandler({canPlay: true}) },
      { name: 'error', handler: this.staticHandler({ isPlaying: false, canPlay: false }) },
      { name: 'timeupdate', handler: this.buildHandler((a: HTMLAudioElement) => ({ currentTime: a.currentTime })) },
      { name: 'pause', handler: this.staticHandler({ isPlaying: false }) },
      { name: 'playing', handler: this.staticHandler({ isPlaying: true }) },
      { name: 'durationchange', handler: this.buildHandler((a: HTMLAudioElement) => ({ duration: a.duration })) },
      { name: 'ended', handler: this.sideEffect(() => { this.playlistService.endEpisode(); }) }
    ];
}


```

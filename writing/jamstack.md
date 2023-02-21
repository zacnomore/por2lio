---
title: Why We're Rendering Static Pages Again (JAMstack isn't ASP)
description: A condensed history of the web and how we're using the oldest web tech in a very new way.
slug: why-jamstack-is-actually-new
date: 2020-02-05
published: true
---

Static site generators are all the rage now but in the beginning there were only static sites. It was difficult to compare native applications to the web, the limitations were obvious to users and difficult to build around. (This seems like a good spot to talk about DHTML but it really doesn't matter too much to the point. Those static pages became sorta kinda dynamic by making the underlying static systems _able_ to be dynamic.) Enter jQuery, Ajax and the whole business of client-side logic. Add some years of growth in functionality (and expectations!) and you get the single page app and modern frameworks. Performance optimization inevitably led to AOT compilation, server side rendering, and DOM hydration to reduce the real and apparent load speed.

So why would we want to go back? There's a couple key distinctions here, the static sites we make now are radically different. In the past a static site lacked any dynamic content and interaction was fairly lackluster. In order to be highly dynamic and interactive you needed to trade off for performance with a thick client. We don't need to make that trade anymore.

Content can be dynamic to varying degrees. If you want content changing daily or even hourly its entirely possible to push out fresh builds in SSG. Following best practices of atomic deploys creates a seamless experience. If your content is changing by the minute or second, you're still in luck. Every imaginable service has been commoditized into an API, often free. We couldn't access content in this way for a long while and even when we could it certainly wasn't easy. Ajax has become `fetch`, `async`, and `await`.

What was once the 50k inclusion of the [Prototype library](http://prototypejs.org/learn/introduction-to-ajax.html)

```js
new Ajax.Request("/some_url", {
  method: "get",
  onSuccess: function (transport) {
    var response = transport.responseText || "no response text";
    alert("Success! \n\n" + response);
  },
  onFailure: function () {
    alert("Something went wrong...");
  },
});
```

Is now the native (and beautifully flat):

```js
try {
  const response = await fetch('some url);
} catch(e) {
  // Handle error
}
```

We haven't lost or forgotten Ajax. It was such a fantastic idea that it has become a part of the foundation of the web.

One of the (less and less) frequent criticisms of static site generation is that it loses interactivity. I think this largely comes from the growth out of blog-style generators like Jekyll that requires some gymnastics to get interesting things to happen. If you work inside a framework aware system like [gridsome](https://gridsome.org/) you can absolutely create interesting highly interactive sites even though they are statically rendered. Static refers to the artifacts, not the outcome. The interactivity is built up inside the client instead of the server. We don't need to through away all that SPA technology that we've built up. We only have to utilize the SSR technology we already have, albeit for different reasons originally, to introduce them into this space.

I hope I've convinced you that the JAMstack is not a hamstrung version of what we've been doing for the past few years. In fact I hope you find these notions and approaches to content and interactivity to feel fairly natural. Why bother though? This is the magic of static, CDN super powers. CDNs are fantastic at caching static content but if you turn that idea on its ear, they're also fantastic at _hosting_ that content. If you can manage to bake your entire site down into static files, you don't need to manage a server to host it. Pop it up on a service like [Zeit](https://zeit.co) and get incredible performance for _free._

When you use the JAMstack you're not spending your time figuring out how to do the same things every other site is doing. You spend your time thinking about what yours can be doing next.

---
title: The Complicated Life of A Messenger
description: "Strategies for watching events without hurting yourself"
slug: strategies-for-observation
date: 2019-09-07
published: true
---

Imagine that you get a new job as a messenger for your local neighborhood. Every day you get a list messages to share from Charlie the news man. He's a nice guy but boy does he have a lot of messages for you to share. From 8 am to 4 pm every day you go door to door in the neighborhood to inform people of an incoming storm or a sale at the local butcher shop. People enjoy them... for the most part.

## Polling

```javascript
// Don't worry how he gets his messages,
// we'll focus on delivery for now
const charlie = {
  getMessages: () => [
    `Kite flying contest tomorrow at noon`,
    `The butcher has a sale on steaks!`
  ]
}

class Messenger {
  _messages = [];
  getMessages() {
    return this._messages;
  }
  addMessages(newMessages) {
    this._messages = [
      ...this._messages,
      ...newMessages
    ];
  }
  emptyMessages() {
    this._messages = [];
  }
}

// Welcome to your new job!
const you = new Messenger();

// Called at 8 am
function start () {
  you.addMessages(
    charlie.getMessages()
  );
}

// Called for each delivery
function deliverMessages () {
  neighborhood.forEach(resident => {
    resident.giveMessage(you.getMessages());
  })
}

// Called at 4 pm
function end () {
  you.emptyMessages();
}
```

There's some problems though. When you told Sal about the fun at the butcher shop he was less than interested. *He's a vegetarian.* Also, Stanley is very sour on the whole kite thing and he does not want to talk about it. It was alright for a first day but you wonder if there's room for improvement so you sit down and think about the problems you've seen:

You decide to visit your boss's office after work to make some suggestions.

## Pub Sub

You've figured out that many people in your neighborhood only care about certain kinds of messages. Rather than giving them every message you can ask which topics they're interested in and give only messages under those topics. You pitch the following proposal:

```javascript
const messageTypes = {
  EVENT: 'event',
  SALE: 'sale'
}

// We ask Charlie to mark up the envelopes
// with the message type
const charlie = {
  getMessages: () => [
    {
      type: messageTypes.EVENT,
      body: `Kite flying contest tomorrow at noon.`
    },
    {
      type: messageTypes.SALE,
      body: `Info: The butcher has a sale on steaks!`
    }
  ]
}

class Messenger {
  // Only give the messages matching the given type
  getMessages(type) {
    return this._messages.filter(
      m => m.type === type
    );
  }
}

// Our recipients now tell us what kinds
// of messages they would like
function deliverMessages (types) {
  return types.flatMap(type => you.getMessages(type));
}
```

You boss is intrigued but has some feedback for you. She points out that you're adding some cost to the department as now you and Charlie need to coordinate about what kinds of messages there are. She also notes that residents have offloaded the filtering to you so now you're slowing down and wonders if you'll be able to move as fast. She says that you're introducing complexity without a meaningful optimization.

What a weird thing to say.

You have an idea though. What if residents submitted subscriptions to you so that you only visit houses that you have messages for?

You make the following amendments:

```javascript
class SubscriptionBox {
  _subscriptions = [];
  _messageTypes = {
    WEATHER: 'weather',
    SALE: 'sale'
  }

  // Residents come at any time and subscribe to topics they would like
  // These come into effect the following day
  subscribe(resident, messageType) {
    this._subscriptions.push({residence, messageType});
  }

  unsubscribe(resident, messageType) {
    this._subscriptions.splice(
      this._subscriptions.findIndex(
        sub => sub === {resident, messageType}
      ), 1
    );
  }

  getSubscribedTypes(resident) {
    return this._subscriptions.filter(sub => sub.resident === resident);
  }

  getSubscriptionsByResident() {
    return this._subscriptions.reduce((acc, cur) => {
      const subs = acc[cur.resident] || [];
      subs.push(cur.messageType);
      acc[cur.resident] = curArray;
      return acc;
    }, {});
  }
}

class Messenger {
  todaysRoute = {};
}

// A lovely addition to your town!
const coolBox = new SubscriptionBox();


function start() {
  you.todaysRoute = getSubscriptionsByResident();
}

function deliverMessages () {
  neighborhood
  .filter(you.todaysRoute.hasOwnProperty) // We'll skip any residents that don't have mail!
  .forEach(resident => {
    resident.giveMessage(you.getMessages());
}
```

It's a wonderful success! People are getting their mail earlier because you're moving faster and they have less junk mail to go through. Everyone is happy except Charlie who now has to categorize all the messages. He's grumbles something about how you could figure out who to deliver to based on content instead of making him mark all the topics himself but that's for another day.
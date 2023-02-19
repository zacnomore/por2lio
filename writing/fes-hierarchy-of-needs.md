---
title: Website Hierarchy of Needs
description: "A method for prioritizing the many competing requirements of web construction."
slug: fe-hierarchy-of-needs
date: 2020-10-02
published: true
---

Recently I saw [this talk](https://www.youtube.com/watch?v=Jhe-BXdQHl8) by [Mark Ferlatte](https://twitter.com/ferlatte) about getting the Healthcare.gov up and running back when it was struggling to serve its users. It's a great talk that gets its point across quickly (<5 minutes!) but to summarize, you can't do everything first, you have to have to prioritize. That's not a new concept, if you've even been in a sprint planning session where tech debt is competing with new features, you know how difficult it can be to argue about which should be the priority. The part of this talk that I want to focus on is how it frames the conversation, it presents those needs as a hierarchy.

The classic challenge with priority conversations is that each piece of work is a _need_ from a certain perspective. The site _needs_ accessibility updates for legal and the site _needs_ to be more performant for digging deeper into the mobile consumer segment and the site _needs_ these new features to support the upcoming marketing campaign but it also _needs_ the new button styles to keep up with the new branding initiative. All these requests truly are needs.They have substantial value and there are real consequences if they aren't met.

This conversation boils down to what might not get done, what's less important. That's not directly stated of course but when your initiative lands at the bottom of the list or even the middle of the list, it can be painful. People get invested in their work and this moment can feel like others don't value what we do. If you went ahead and watched the video you probably see where this is going. If we take Mr. Ferlatte's approach and frame this as a hierarchy rather than a sequence, the needs become interconnected. We _can't_ work on the new button styles until the site is accessible because it is foundational, it *supports* the new buttons. We can become jointly invested in that work because its supportive rather than in the way. 

I believe there is an important rule to add to this system. Work should be given priority by its height in the hierarchy. It seems implicit but I think it's worth calling out. Work should not eternally focus on the foundational levels but should strive to reach the highest heights. This is important not just to ensure there's a good spread of work but psychologically it makes all pieces of the pyramid important. The foundation is *needed* to support the upper levels, the top and middle are explicitly the goal and therefore clearly *needed*. Making all the concerns feel needed is an important step to making all the team members feel valued.

There are challenges with this method still, it's not all sunshine and roses. The breadth of work that needs completed for the foundation to be "ready" is up to debate, it is not something easily measured. The priority in the hierarchy becomes more contentious than the priority of the tasks because it becomes the framework for future decision-making. While these are challenges, I want to call attention to how these problems look paired with the benefits offered and provide a method for managing them as well.

Without the hierarchy, we are forced to have the same conversations over and over. "Should we build this new type of page first or work on site performance" transforms into "Are we ready to expand site flexibility or do we need further stability?" It becomes more removed and thus easier to argue and come to agreement. 

The priority in the hierarchy is essentially front-loading the conversation. Good and bad with that, you're putting a question to bed for good but it can be painful. To make that hierarchy a bit less contentious, try delineating the concerns in cross-cutting ways. Instead of "security" which will be be of little interest outside the technical circles, consider "stability" which highlights the impact to business. This will avoid creating a hierarchy of departments instead of needs.

Much credit is due to Mr. Ferlatte for his fantastic talk and for presenting the wonderful core of this idea. I believe that this expansion approach provides value and when correctly managed can make priority conversations much easier.
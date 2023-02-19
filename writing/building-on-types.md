---
title: Extending pre-existing types in TypeScript
---

_Note - If you're in Angular reactive or template forms are a much better option. This is just an exploration of typescript._

It can be quite tempting to modify a class or interface when implementing new features. I first noticed this habit when I was mapping some objects that I found to have a lot extraneous data. I went looking to see if I could pare it down at all, maybe making my life a little easier. Nearly every property on this object was deeply nested and looked unrelated to the rest. There was no pivotal moment though that made this object bloated, I could see they were added one at a time by different authors. It made sense, each developer felt it was not the time to refactor and _surely_ someone after them would.

I wondered how this could be prevented, I knew there was some logic to the construction. Some data related to different view states while others got transformed completely away into other values. I attempted an experiment to factor away the portions that related to the view. I found some time later that I had inadvertently recreated parts of Angular's forms library. I wasn't intent on using it, why bother instead of using a more robust and better tested library. However, I was interested in what came out of it so I wanted to share.

So, here's an angular service that creates view-model objects for building forms out of more abstract model objects. It provides some utilities for using the form objects, very strong typing and transformational function to switch between the given object's type and its corresponding form object.


```typescript
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class FormService {
  createForm<T>(initialValues: T, validators?: { [P in keyof T]: Validator<T[P]>[]}): Form<T> {
    return Array.from(Object.entries(initialValues)).reduce((acc, [key, val]) => {
      acc[key] = {
        value: val,
        touched: false,
        valid: false,
        validate: !!validators ? validators[key] || [] : []
      };
      return acc;
    }, <Form<T>>{});
  }

  validateForm<T>(form: Form<T>): ValidationReport<T> {
    const report: ValidationReport<T> = [];
    for (const key in form) {
      if (form.hasOwnProperty(key)) {
        report.push({
          key,
          valid: this.validateField(form[key])
        });
      }
    }
    return report;
  }

  validateField<T>(field: Field<T>): boolean {
    return field.validation.every(v => v(field.value));
  }


  extractData<T>(form: Form<T>): T {
    return Array.from(Object.entries(form)).reduce((acc, [key, val]) => {
      acc[key] = val;
      return acc;
    }, <T>{});
  }
}


// This is the magic. For each key [Property in base type], there's a Field of the type of the property in the base type.
// T[P] accesses the type of P rather that using just P which would give its key instead
export type Form<T> = {
  [P in keyof T]: Field<T[P]>;
};

export interface Field<T> {
  valid: boolean;
  value: FieldValue;
  touched: boolean;
  validation: Validator<T>[];
}

export type ValidationReport<T> = {
  key: keyof T,
  valid: boolean;
}[];

export type FieldValue = string | number;
export type Validator<T> = (value: T) => boolean;
```

Notice that while these generics make all this logic reusable, they also encourage passing around a smaller object and only creating this Form extended object when it's actually needed. To implement a system like this you really have to get out ahead of the idea though. I think it would be challenging to lay this kind of groundwork unless you're creating one of the first-of-its-kind properties. You really have to keep your head on a swivel to create something like this that's actually usedul, after all I never got to use it!

Just for the sake of completeness, he's what using that functionality would look like.

```typescript
example() {
  const form = this.formService.createForm<Test>({
    something: 'Test',
    someOtherThing: 12
  }, {
    something: [v => !!v, v => v.length > 0],
    someOtherThing: [v => v > 10]
  });


  const readyToContinue = this.formService.validateForm(form).valid;
}

interface Test {
  something: string;
  someOtherThing: number;
}
```

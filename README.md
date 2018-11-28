# Safely create dot notation

Dot notation is widely used in popular library such as `lodash`, `mongodb`,`immutable.js` (not really dot notation but same same) etc.
This library utilize Typescript's conditional type to help create a dotted path notation in a type-safed way.
Requires Typescript >= 2.9

```typescript
type TestType = {
    obj: { num: number };
    str: string;
    bool?: boolean;
    keyA: TestType;
    keyB?: TestType;
    keyC: TestType | null;
    keyD: TestType | undefined;
    keyE: TestType[];
    keyF?: TestType[];
    keyG: TestType[] | null;
    keyH: TestType[] | undefined;
};

const pathNav = DottedPath<TestType>();

pathNav.goTo('obj').goTo('num').end() // obj.num
pathNav.goTo('keyA').goTo('str').end() // keyA.str
pathNav.goTo('keyA').goTo('keyB').goTo('keyC').goTo('keyD').goTo('keyE').goTo(0).goTo('keyF').goTo(1).end() // keyA.keyB.keyC.keyD.keyE.0.keyF.1

// skip index will ignore index segments on array type, which is useful for some library like mongodb's query criteria
DottedPath<TestType>({ skipIndex: true }).goTo('keyE').goTo(0).goTo('obj') // keyE.obj

// alternatively, you can also skip a segment manually
pathNav.goTo('keyE').goTo(0, { ignore: true }).goTo('obj') // keyE.obj

// or you can append a segment that are not related to provided type
pathNav.goTo('keyE').append('$').goTo('obj') // keyE.$.obj
```
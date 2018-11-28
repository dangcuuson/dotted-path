import { DottedPath } from '../index';

type TestType = {
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

const pathNav = DottedPath<TestType>();;

it('should be able navigate from obj to primitive field', () => {
    expect(pathNav.goTo('keyA').goTo('str').end()).toBe('keyA.str');
    expect(pathNav.goTo('keyA').goTo('bool').end()).toBe('keyA.bool');
});

it('should be able navigate from optional obj to primitive field', () => {
    expect(pathNav.goTo('keyB').goTo('str').end()).toBe('keyB.str');
    expect(pathNav.goTo('keyB').goTo('bool').end()).toBe('keyB.bool');
});

it('should be able navigate from obj or null to primitive field', () => {
    expect(pathNav.goTo('keyC').goTo('str').end()).toBe('keyC.str');
    expect(pathNav.goTo('keyC').goTo('bool').end()).toBe('keyC.bool');
});

it('should be able navigate from obj or undefined to primitive field', () => {
    expect(pathNav.goTo('keyD').goTo('str').end()).toBe('keyD.str');
    expect(pathNav.goTo('keyD').goTo('bool').end()).toBe('keyD.bool');
});

it('should be able navigate from array to primitive field', () => {
    expect(pathNav.goTo('keyE').goTo(0).goTo('str').end()).toBe('keyE.0.str');
    expect(pathNav.goTo('keyE').goTo(0).goTo('bool').end()).toBe('keyE.0.bool');
});

it('should be able navigate from optinal array to primitive field', () => {
    expect(pathNav.goTo('keyF').goTo(0).goTo('str').end()).toBe('keyF.0.str');
    expect(pathNav.goTo('keyF').goTo(0).goTo('bool').end()).toBe('keyF.0.bool');
});

it('should be able navigate from array or null to primitive field', () => {
    expect(pathNav.goTo('keyG').goTo(0).goTo('str').end()).toBe('keyG.0.str');
    expect(pathNav.goTo('keyG').goTo(0).goTo('bool').end()).toBe('keyG.0.bool');
});

it('should be able navigate from array or undefined to primitive field', () => {
    expect(pathNav.goTo('keyH').goTo(0).goTo('str').end()).toBe('keyH.0.str');
    expect(pathNav.goTo('keyH').goTo(0).goTo('bool').end()).toBe('keyH.0.bool');
});

it('should be able to navigate to many deep level', () => {
    const longPath = pathNav.goTo('keyA').goTo('keyB').goTo('keyC').goTo('keyD').goTo('keyE').goTo(0).goTo('keyF').goTo(0).goTo('keyG').goTo(0).goTo('keyH');
    expect(longPath.end()).toBe('keyA.keyB.keyC.keyD.keyE.0.keyF.0.keyG.0.keyH');
})

it('should skip index correctly', () => {
    expect(DottedPath<TestType>({ skipIndex: true }).goTo('keyH').goTo(0).goTo('str').end()).toBe('keyH.str');
});

it('should ignore correctly', () => {
    expect(pathNav.goTo('keyH', { ignore: true }).goTo(0).goTo('str').end()).toBe('0.str');
});

it('should append segment correctly', () => {
    expect(pathNav.goTo('keyH').append('$').goTo(0).goTo('str').end()).toBe('keyH.$.0.str');
})
// `three` ships no type declarations and @types/three is not a dependency, so
// `tsc --noEmit` (npm run typecheck) fails with TS7016 on `import * as THREE`.
// This ambient module declares only the classes LightPillar.tsx uses, each as
// an open `any`-shaped class. Replace with `@types/three` for real typing.
declare module 'three' {
  class Loose {
    constructor(...args: any[]);
    [key: string]: any;
  }
  export class Scene extends Loose {}
  export class ShaderMaterial extends Loose {}
  export class WebGLRenderer extends Loose {}
  export class OrthographicCamera extends Loose {}
  export class PlaneGeometry extends Loose {}
  export class Vector2 extends Loose {}
  export class Vector3 extends Loose {}
  export class Color extends Loose {}
  export class Mesh extends Loose {}
}

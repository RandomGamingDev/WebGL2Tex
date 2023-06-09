# WebGL2Tex
A simple library for OOP encapsulation and abstraction of some of the different WebGL2 textures.

There's the `Texture.Base` class which is the base for the other classes which currently are: <br/>
`Texture.T2D`: 2D WebGL textures <br/>
`Texture.T3D`: 3D WebGL textures <br/>

Check to code and the WebGL documentation for the parameters needed.

Pair this up with other code that uses WebGL in order to get access to a more types of textures without having to deal with WebGL being WebGL :D

To use this library you can simply include https://cdn.jsdelivr.net/gh/RandomGamingDev/WebGL2Tex/tex.js in your HTML file! If you want to you can also just download the file and include it in your HTML file that way.

btw stuff updates so remember to specify a version/commit for your library if you want to use a link and don't want your code to automatically update to the newest version of the library

Also, this library is based on the Wireframe game engine, which is another project that I made, and is more specifically a C++ game engine/framework for graphics and audio abstractions for ease of use (it's 0-cost too :D). You can check that out here: https://github.com/RandomGamingDev/Wireframe

## Things to note if you're using this with p5.js
  In order to use this library with p5.js you're going to need to know a few things.
  1. p5.js doesn't currently use WebGL2 (although this might be different at the time your watching this), which is needed for this library, so I recommend using this other library I created: https://github.com/RandomGamingDev/WebGL2Tex, which adds WebGL2 to p5.js
  2. The gl used in this library is fundamentally equivalent to the `drawingContext` variable/element of the p5.js canvas so if you're using a global instance use `drawingContext` and otherwise use `<current canvas>.drawingContext`
  3. The shader used in p5.js isn't the same as a pure WebGL shader, and is instead a wrapper around it. When there's a shader you'll want to use your current shader's `._glProgram` variable/element.
  4. With 2D shaders (and perhaps other shader types in the future) p5.js does a weird thing where it resets all of the different uniforms to uniforms that it has stored in cache. This library is outside of the p5.js library and thus doesn't conform to its standards, which means that you'll have to override them, which you can do by doing this:
  ```js
  shad.samplers[<where your shader is in the cache>].texture.bindTexture = () => null;
  shad.samplers[<where your shader is in the cache>].texture.update = () => null;
  shad.samplers[<where your shader is in the cache>].location = drawingContext.getUniformLocation(shad._glProgram, <the uniforms name>);
  ```
  ofc you'll also want to make sure that you're writing to the correct location in cache
  
  And that's all you need to know to get this library working alongside the p5.js library

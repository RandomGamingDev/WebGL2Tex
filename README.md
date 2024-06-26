# WebGL2Tex
A simple library for OOP encapsulation and abstraction of some of the different WebGL2 textures.

<img src="WebGL2Tex.png" width="256"/>

Note: If you wanna see examples of how to use the library check out https://github.com/RandomGamingDev/WebGL2Tex/tree/main/examples and if you want to learn about the more complex features you can search on Google and check out the WebGL documentation since this is basically just an OOP overlay over the WebGL API to make it easier to use and learn which means that u should be able to figure out how to use the library from the WebGL documentation and searches on WebGL.

There's the `Texture.Base` class which is the base for the other classes which currently are: <br/>
`Texture.T2D`: 2D WebGL textures <br/>
`Texture.T3D`: 3D WebGL textures <br/>

Check the code and the WebGL documentation for the parameters needed.

Pair this up with other code that uses WebGL in order to get access to a more types of textures without having to deal with WebGL being WebGL :D

To use this library you can simply include https://cdn.jsdelivr.net/gh/RandomGamingDev/WebGL2Tex/tex.js in your HTML file! If you want to you can also just download the file and include it in your HTML file that way.

btw stuff updates so remember to specify a version/commit for your library if you want to use a link and don't want your code to automatically update to the newest version of the library

Also, this library is based on the Wireframe game engine, which is another project that I made, and is more specifically a C++ game engine/framework for graphics and audio abstractions for ease of use (it's 0-cost too :D). You can check that out here: https://github.com/RandomGamingDev/Wireframe

## Things to note if you're using this with p5.js
  In order to use this library with p5.js you're going to need to know a few things.
  1. In order to use WebGL stuff u'll need to enable WebGL mode
  2. If you're using a p5.js version older than 1.7,0, which is needed for this library since only versions beyond that support WebGL 2, I recommend using this other library I created: https://github.com/RandomGamingDev/WebGL2p5, which adds WebGL2 to p5.js
  3. The gl used in this library is fundamentally equivalent to the `drawingContext` variable/element of the p5.js canvas so if you're using a global instance use `drawingContext` and otherwise use `<current canvas>.drawingContext`
  4. The shader used in p5.js isn't the same as a pure WebGL shader, and is instead a wrapper around it. When there's a shader you'll want to use your current shader's `._glProgram` variable/element.
  5. With 2D shaders (and perhaps other shader types in the future) p5.js does a weird thing where it resets all of the different uniforms to uniforms that it has stored in cache. This library is outside of the p5.js library and thus doesn't conform to its standards, which means that you'll have to override them, which you can do by doing this:
  ```js
  shad.samplers.length = 0;
  ```
  more specifically you'll want to do it after rendering something with the shader that you're using in case you're wondering when this data is generated so that you can replace it
  ofc you'll also want to make sure that you're writing to the correct location in cache
  
  And that's all you need to know to get this library working alongside the p5.js library

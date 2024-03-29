let Texture = {};

Texture.Base = class {
  constructor(tex, bufType, gl) {
    this.tex = tex;
    this.bufType = bufType;
    this.gl = gl;
  }
  
  setUniform(shad, uniName) {
    this.gl.uniform1i(this.gl.getUniformLocation(shad, uniName), this.slot);
  }
  
  pixelStoreI(param, val) {
    this.gl.texParameteri(param, val);
  }

  pixelStoreF(param, val) {
    this.gl.texParameterf(param, val);
  }

  paramI(param, val) {
    this.gl.texParameteri(this.bufType, param, val);
  }
  
  paramF(param, val) {
    this.gl.texParameterf(this.bufType, param, val);
  }
  
  genMipmap() {
    this.gl.generateMipmap(this.gl.bufType);
  }
  
  bind() {
    this.gl.bindTexture(this.bufType, this.tex);
  }
  
  unbind() {
    this.gl.bindTexture(this.bufType, null);
  }

  activate() {
    this.gl.activeTexture(this.gl.TEXTURE0 + this.slot);
  }
  
  delete() {
    this.gl.deleteTexture(this.tex);
  }
}

Texture.T2D = class extends Texture.Base {
  constructor(level,
              internalFormat,
              w, h,
              slot,
              border, srcFormat,
              srcType, pixel,
              gl) {
    super(gl.createTexture(), gl.TEXTURE_2D, gl);

    this.level = level;
    this.internalFormat = internalFormat;
    this.res = [w, h];
    this.slot = slot;
    this.border = border;
    this.srcFormat = srcFormat;
    this.srcType = srcType;
    this.pixel = pixel;

    this.activate();
    this.bind();
    this.data();
  }
  
  data(level = this.level,
       internalFormat = this.internalFormat,
       w = this.res[0], h = this.res[1],
       border = this.border, srcFormat = this.srcFormat,
       srcType = this.srcType, pixel = this.pixel, offset = 0) {
    this.gl.texImage2D(
      this.bufType,
      level,
      internalFormat,
      w,
      h,
      border,
      srcFormat,
      srcType,
      pixel,
      offset
    );
  }
  
  subData(level,
          xoffset,
          yoffset,
          w, h,
          format,
          type,
          source,
          offset = 0) {
    this.gl.texSubImage2D(this.bufType,
                          level,
                          xoffset,
                          yoffset,
                          w,
                          h,
                          format,
                          type,
                          source,
                          offset);
  }
}

Texture.T3D = class extends Texture.Base {
    constructor(level,
                internalFormat,
                w, h, l,
                slot,
                border, srcFormat,
                srcType, pixel,
                gl) {
      super(gl.createTexture(), gl.TEXTURE_3D, gl);


      this.level = level;
      this.internalFormat = internalFormat;
      this.res = [w, h, l];
      this.slot = slot;
      this.border = border;
      this.srcFormat = srcFormat;
      this.srcType = srcType;
      this.pixel = pixel;

      this.activate();
      this.bind();
      this.data();
    }
    
    data(level = this.level,
         internalFormat = this.internalFormat,
         w = this.res[0], h = this.res[1], l = this.res[2],
         border = this.border, srcFormat = this.srcFormat,
         srcType = this.srcType, pixel = this.pixel, offset = 0) {
      this.gl.texImage3D(
        this.bufType,
        level,
        internalFormat,
        w, h, l,
        border,
        srcFormat,
        srcType,
        pixel,
        offset
      );
    }
    
    subData(level,
            xoffset,
            yoffset,
            zoffset,
            w, h, l,
            format,
            type,
            source,
            offset = 0) {
      this.gl.texSubImage3D(this.bufType,
                            level,
                            xoffset,
                            yoffset,
                            zoffset,
                            w,
                            h,
                            l,
                            format,
                            type,
                            source,
                            offset);
    }
}
let Texture = {};

Texture.Base = class {
  constructor(tex, bufType, gl) {
    this.tex = tex;
    this.bufType = bufType;
    this.gl = gl;
  }
  
  setUniform(shad, uniName) {
    this.activate();
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
  
  subData(data, length, writeOffset = 0, readOffset = 0) {
    this.gl.bufferSubData(this.bufType, writeOffset, data, readOffset, length);
  }

  getBufferSubData(data, readOffset = 0, writeOffset = 0) {
    this.gl.getBufferSubData(this.bufType, readOffset, data, writeOffset);
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
    
    this.bind();
    this.slot = slot;
    this.activate();
    this.data(
      level,
      internalFormat,
      w,
      h,
      border,
      srcFormat,
      srcType,
      pixel
    );
  }
  
  data(level,
       internalFormat,
       w, h,
       border, srcFormat,
       srcType, pixel) {
    this.gl.texImage2D(
      this.bufType,
      level,
      internalFormat,
      w,
      h,
      border,
      srcFormat,
      srcType,
      pixel
    );
  }
  
  subData(level,
          xoffset,
          yoffset,
          w, h,
          format,
          type,
          source) {
    this.gl.texSubImage2D(this.bufType,
                          level,
                          xoffset,
                          yoffset,
                          w,
                          h,
                          format,
                          type,
                          source);
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
      this.bind();
      this.slot = slot;
      this.activate();
      this.data(
        level,
        internalFormat,
        w, h, l,
        border,
        srcFormat,
        srcType,
        pixel
      );
    }
    
    data(level,
         internalFormat,
         w, h, l,
         border, srcFormat,
         srcType, pixel) {
      this.gl.texImage3D(
        this.bufType,
        level,
        internalFormat,
        w, h, l,
        border,
        srcFormat,
        srcType,
        pixel
      );
    }
    
    subData(level,
            xoffset,
            yoffset,
            zoffset,
            w, h, l,
            format,
            type,
            source) {
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
                            source);
    }
}

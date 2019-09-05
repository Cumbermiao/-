
### 纹理
> *纹理映射*就是将一张图片映射到一个几何图形的表面上。映射的图片就是*纹理*

纹理映射的作用就是根据纹理图像，为之前光栅化后的每个片元涂上合适的颜色。组成纹理图像的像素又被称为*文素*。

### 纹理映射步骤
1. 准备好映射的纹理
2. 为几何图形配置纹理映射方式
3. 加载纹理图像，对其进行一些配置以在 WEBGL 中使用。
4. 在片元着色器中将相应的纹素从纹理中抽取出来， 将纹素的颜色赋给片元。

### 纹理坐标
纹理坐标是用的st坐标系统， 以纹理的左下角为(0,0),左上角为(0.1),右下角为(1,0)。 
不管纹理图像的像素多大， 都是在(0,1.0)以内。 

### 图片坐标
图片坐标的x轴与纹理方向是一样的， y轴方向相反， 所以需要将图片坐标的y轴进行翻转才能正确映射到图形上。

### 将纹理贴到几何体上
由于纹理坐标和 webgl 中的坐标不一致，对应的我们要将纹理的坐标映射到 webgl 中的坐标， 如： (0,0)=>(-0.5,0.5)

### 纹理单元
WebGL 通过纹理单元机制来同时使用多个纹理， 每个纹理单元有一个单元编号来管理一张纹理图像。默认情况下， WebGL 至少支持8个纹理单元， 内置的变量为 gl.TEXTURE0 ... gl.TEXTURE7 ， 各表示一个纹理单元。
在 WebGL 中是无法直接操作纹理对象的， 需要将纹理对象绑定到纹理单元上， 对纹理单元进行操作。

### sampler
> sampler 翻译过来是取样器， 是用来接收纹理数据的。
sampler 的数据类型有两种， simple2D、samplerCube 分别是 gl.TEXTURE_2D 、 gl.TEXTURE_CUBE_MAP 上的纹理数据类型。
使用 gl.uniform1i(sampler,idx) 将编号为 idx 的纹理单元上的数据传递给 sampler 。 

## api

### gl.createTexture()
>创建纹理对象
#### 参数
无
#### 返回值
- non-null : 新创建的纹理对象
- null : 创建失败
#### 错误
无

### gl.deleteTexture(texture)
>删除纹理对象
#### 参数
- texture : 待删除的纹理对象
#### 返回值
无
#### 错误
无

### gl.pixelStorei(pname,param)
#### 参数
- pname : gl.UNPACK_FLIP_Y_WEBGL 对图像进行Y轴翻转,默认值为false； gl.UNPACK_PERMULTIPLY_ALPHA_WEBGL 将图像RGB颜色值的每个分量乘以A，默认值为 false;

- param : 指定非0或0，必须为整数；
#### 返回值
无
#### 错误
- INVALID_ENUM : pname 不是合法的值 

### gl.activeTexture(texUnit)
>开启纹理单元
#### 参数
- texUnit : 待激活的纹理单元

#### 返回值
无
#### 错误
- INVALID_ENUM : texUnit 不是合法的值 

### gl.bindTexture(target,texture)
> 开启纹理对象，向 target 绑定纹理对象,并指定 target 的类型
#### 参数
- target : gl.TEXTURE_2D  二维纹理 ; gl.TEXTURE_BUVE_MAP 立方体纹理

#### 返回值
无
#### 错误
- INVALID_ENUM : target 不是合法的值 

### gl.textParamteri(target,pname,param)
> 配置纹理对象的纹理参数
#### 参数
- target : gl.TEXTURE_2D  二维纹理 ; gl.TEXTURE_BUVE_MAP 立方体纹理
- pname : 纹理参数； gl.TEXTURE_MAG_FILTER 纹理放大 默认值为 gl.LINEAR ； gl.TEXTURE_MIN_FILTER 纹理缩小 默认值为 gl.NEAREST_MTPMAP_LINEAR ； gl.TEXTURE_WRAP_S 纹理水平填充 默认值为 gl.REPEAT ; gl.TEXTURE_WRAP_T 纹理垂直填充 默认值为 gl.REPEAT;

- param : gl.NEAREST; gl.LINEAR; gl.REPEAT; gl.MIROORED_REPEAT; gl.CLAMP_TO_EDGE
#### 返回值
无
#### 错误
- INVALID_ENUM : target 不是合法的值 

### gl.txtImage2D(target,level,internaliformat,format,type,image)
> 将纹理图像分配给纹理对象
- target : gl.TEXTURE_2D  二维纹理 ; gl.TEXTURE_BUVE_MAP 立方体纹理
- level : 传入0，该参数是为金字塔纹理准备的
- internaliformat : 图像的内部格式
- format ： 纹理数据的格式, 必须与 internaliformat 相同
- type : 纹理数据的类型
- image : 包含纹理图像的 Image 对象
#### 返回值
无
#### 错误
- INVALID_ENUM : target 不是合法的值 
- INVALID_OPERATION : 当前目标上没有绑定纹理对象

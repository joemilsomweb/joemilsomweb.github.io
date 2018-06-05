varying vec2 vUv;

uniform sampler2D tex;
uniform sampler2D tex_2;
uniform float noiseMultiplier;

uniform float redMultiplier;
uniform float greenMultiplier;
uniform float blueMultiplier;

uniform int mouseOver;
uniform float mixValue;
uniform float mouseOverScale;

uniform vec2 mousePos;
uniform vec2 resolution;

vec2 distortSlow(vec2);
vec2 distortFast(vec2);
vec2 distortMouse(vec2);

float cubicIn(float);

vec4 oldDistort(float);

vec3 mod289(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec2 mod289(vec2 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec3 permute(vec3 x) {
  return mod289(((x*34.0)+1.0)*x);
}

float snoise(vec2 v)
  {
  const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                      0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                     -0.577350269189626,  // -1.0 + 2.0 * C.x
                      0.024390243902439); // 1.0 / 41.0
// First corner
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);

// Other corners
  vec2 i1;
  //i1.x = step( x0.y, x0.x ); // x0.x > x0.y ? 1.0 : 0.0
  //i1.y = 1.0 - i1.x;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  // x0 = x0 - 0.0 + 0.0 * C.xx ;
  // x1 = x0 - i1 + 1.0 * C.xx ;
  // x2 = x0 - 1.0 + 2.0 * C.xx ;
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;

// Permutations
  i = mod289(i); // Avoid truncation effects in permutation
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
		+ i.x + vec3(0.0, i1.x, 1.0 ));

  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;

// Gradients: 41 points uniformly over a line, mapped onto a diamond.
// The ring size 17*17 = 289 is close to a multiple of 41 (41*7 = 287)

  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;

// Normalise gradients implicitly by scaling m
// Approximation of: m *= inversesqrt( a0*a0 + h*h );
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );

// Compute final noise value at P
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main()
{
	float n = snoise((gl_FragCoord.xy) / 30. + snoise(vUv.xy * 5.));

  float s = 2.;

	vec4 texR = texture2D(tex_2, vec2(vUv.x  * s + n * 0.015, vUv.y * s  + noiseMultiplier*0.1));
	vec4 texG = texture2D(tex_2, vec2(vUv.x  * s + n * 0.022, vUv.y * s  + noiseMultiplier*0.2));
	vec4 texB = texture2D(tex_2, vec2(vUv.x  * s + n * 0.01, vUv.y * s  + noiseMultiplier*0.06));

	vec4 col = vec4(texR.r, texG.g, texB.b, texR.a);

	col.r *= redMultiplier;
	col.g *= greenMultiplier;
	col.b *= blueMultiplier;

  vec4 colMask;

  vec2 texCoord = distortSlow(vUv);
  vec2 texCoord2 = distortFast(vUv);

  vec2 t = mix(texCoord, texCoord2, mixValue);

  vec2 t2 = distortMouse(t);
  t2 = clamp(t2, vec2(0., 0.), vec2(1., 1.));

  colMask = texture2D(tex, t2); 

	// col.r = noiseMultiplier;

	col.rgb *= 1.- colMask.rgb;
	col.a *= colMask.a;

  // col = texture2D(tex, vUv);

	gl_FragColor = col;
}

vec2 distortSlow(vec2 v){
    // return texture2D(tex,
    // vec2(vUv.x + sin(gl_FragCoord.x/15. + noiseMultiplier) / 85.,
    // vUv.y + sin(sin(gl_FragCoord.x/15. + noiseMultiplier) / 10. + sin(noiseMultiplier /10.)) / 40.));
  v.x = v.x + sin(gl_FragCoord.x/35. + noiseMultiplier) / 125.;  
  v.y = v.y + (sin(gl_FragCoord.x/15. + noiseMultiplier) / 10. + sin(noiseMultiplier /10.)) / 10.;

  return vec2(v.x, v.y);
}

vec2 distortFast(vec2 v){
    v.x = v.x + sin(gl_FragCoord.x/15. + noiseMultiplier * 10.) / 150.;
    v.y = v.y + sin(gl_FragCoord.y/20. + noiseMultiplier * 10.) / 50.;

    return vec2(v.x, v.y);
}

vec2 distortMouse(vec2 v){
  // if(distance(gl_FragCoord.xy, vec2(mousePos.x, resolution.y - mousePos.y)) < 30.){
    // col.rgba = vec4(0., 0., 0., 1.);
  // }
  vec2 tNorm = vec2(gl_FragCoord.x, gl_FragCoord.y);
  vec2 mNorm = vec2(mousePos.x, (resolution.y - mousePos.y));

  float scale = resolution.x / resolution.y;

  float d = distance(tNorm, mNorm);
  float dX = distance(tNorm.x, mNorm.x);
  float dY = distance(tNorm.y, mNorm.y);
  
  float dist = 700.;

  if(d < dist){
    // float p = sin((1. - (d / 0.3))) * 4.;
    float pX = 1. - (d / dist);
    float pY = 1. - (d / dist);

    pX = cubicIn(pX);
    pY = cubicIn(pY);

    
    float diffX = tNorm.x - mNorm.x; 
    float diffY = tNorm.y - mNorm.y;   

    v.x = v.x + ((diffX * 0.0005) * pX) * mouseOverScale;
    v.y = v.y + ((diffY * 0.006) * pY) * mouseOverScale;
  }

  return vec2(v.x, v.y);
}

  //noisemult 0.5 or 0.1 cool
vec4 oldDistort(float n){
  float xMult = 0.005;
  float yMult = 0.01;

  return texture2D(tex,
  vec2(vUv.x + cos(noiseMultiplier * gl_FragCoord.x + n)* xMult,
  vUv.y + sin(noiseMultiplier * gl_FragCoord.y)*yMult));
}

float cubicIn(float t) {
  return t * t * t;
}

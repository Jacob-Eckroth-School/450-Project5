#version 330 compatibility

uniform float uKa, uKd, uKs; // coefficients of each type of lighting
uniform vec3 uColor; // object color
uniform vec3 uSpecularColor; // light color
uniform float uShininess; // specular exponent
uniform float PI;
uniform float TIME;
uniform bool fragWarp;
in vec2 vST; // texture cords
in vec3 vN; // normal vector
in vec3 vL; // vector from point to light
in vec3 vE; // vector from point to eye
void
main( )
{
	float circleRadius = .5;
	vec3 objectColor = uColor;
	float sCenter = .5;
	float tCenter = .5;
	if(!fragWarp){
	   if((pow(vST.s - sCenter,2) + pow(vST.t - tCenter,2) <= pow(circleRadius,2) )){
		  objectColor = vec3(0.,0.,1.);
		}
	}else{
	  if((pow(abs(vST.s - sCenter),2 + cos(2*PI*TIME)) + pow(abs(vST.t - tCenter),2 + cos(2*PI*TIME)) <= pow(circleRadius,2 + cos(2*PI*TIME)) )){
		  objectColor = vec3(0.,0.,1.);
		}
	}

	
	vec3 Normal = normalize(vN);
	vec3 Light = normalize(vL);
	vec3 Eye = normalize(vE);
	vec3 ambient = uKa * objectColor;
	
	float d = max( dot(Normal,Light), 0. ); // only do diffuse if the light can see the point
	vec3 diffuse = uKd * d * objectColor;	//changed this maybe we should change back to uColor?
	float s = 0.;
	if( dot(Normal,Light) > 0. ){ // only do specular if the light can see the point	
		vec3 ref = normalize( reflect( -Light, Normal ) );
		s = pow( max( dot(Eye,ref),0. ), uShininess);
	}
	vec3 specular = uKs * s * uSpecularColor;
	


	gl_FragColor = vec4(ambient+diffuse+specular, 1. );
	
	

}
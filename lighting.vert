#version 330 compatibility
out vec2 vST; // texture coords
out vec3 vN; // normal vector
out vec3 vL; // vector from point to light
out vec3 vE; // vector from point to eye
uniform vec3 LIGHT1POSITION;
uniform float TIME;		//between 0 and 1
uniform float PI;
uniform bool vertexWarp;
void main( ){
	vec4 newPos = gl_Vertex;
	vST = gl_MultiTexCoord0.st;
	if(vertexWarp){
		newPos.x +=   sin(vST.t*12*PI) * cos(TIME  * 6 * PI) * .3;
		newPos.y +=   cos(vST.s*2*PI) * sin(TIME*8*PI) * .3;
	
	}
	
	
	vec4 ECposition = gl_ModelViewMatrix * newPos;
	vN = normalize( gl_NormalMatrix * gl_Normal ); // normal vector
	vL = LIGHT1POSITION - ECposition.xyz; // vector from the point
	// to the light position
	vE = vec3( 0., 0., 0. ) - ECposition.xyz; // vector from the point
	// to the eye position



	//mess with position down here, all that stuff up there is for lighting.
	
	
	gl_Position = gl_ModelViewProjectionMatrix * newPos;
	

}

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'; 
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';







const scene = new THREE.Scene();
scene.fog = new THREE.Fog( 0x724fc2, 9, 20 );

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

//Color fondo
scene.background = new THREE.Color(0.25,0.6,0.95);

//Luz ambiental
// const ambientLight = new THREE.AmbientLight(0xe0e0e0,1);
// scene.add(ambientLight);



const spotlight = new THREE.SpotLight('white', 1000)
spotlight.position.set(0,15,0)
scene.add(spotlight)
spotlight.castShadow=true

const spotlightHelper = new THREE.SpotLightHelper(spotlight)
// scene.add(spotlightHelper)


//Luz direccional
const light = new THREE.DirectionalLight(0xffffff,0.6);
light.position.set(0,4,2);
// light.castShadow=true
scene.add(light);

const helper = new THREE.CameraHelper(light.shadow.camera)
// scene.add(helper);

const hdriloader = new RGBELoader()
hdriloader.load(
    '/ambiente/kloofendal_43d_clear_puresky_2k.hdr',
    function (textura){

        textura.mapping =THREE.EquirectangularReflectionMapping
        scene.background=textura
        scene.environment = textura
    }
)







const renderer = new THREE.WebGLRenderer();
//renderer.toneMapping = THREE.ACESFilmicToneMapping; //opciones aestethic
//renderer.outputColorSpace = THREE.SRGBColorSpace; //opciones aestethic
//renderer.setPixelRatio(window.devicePixelRatio); //opciones aestethic
renderer.shadowMap.enabled=true
renderer.setSize( window.innerWidth, window.innerHeight );

const controls = new OrbitControls( camera, renderer.domElement );

document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshPhongMaterial( { color: 0xffffff } );  
const cube = new THREE.Mesh( geometry, material );
// scene.add( cube );

const planeGeometry = new THREE.PlaneGeometry(30,30,30);
const planeMaterial = new THREE.MeshPhongMaterial({ color: 0x9ac3ed });
const plane= new THREE.Mesh(planeGeometry,planeMaterial)
scene.add(plane)
plane.rotateX(-90*(Math.PI/180))
plane.position.y=-2
plane.receiveShadow= true




const gltfloader = new GLTFLoader();
let baston
let caldero
let piedrita
let mochila
let portal
let botella1

const modelos =[]

gltfloader.load(
  // resource URL
  'baston/baston.gltf',
  // called when the resource is loaded
  function ( gltf ) {
  baston = gltf.scene
      scene.add( baston );

      baston.scale.set(0.15,0.15,0.15);

      baston.position.x= 10

      baston.traverse(subobjeto => {
          if(subobjeto.isMesh)//checamos si tiene mesh, si si, entonces le decimos que emita sombras
              subobjeto.castShadow = true;
              
      })
  },
  // called while loading is progressing
  function ( xhr ) {
      console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
  },
  // called when loading has errors
  function ( error ) {
      console.log( 'An error happened' );
      modelos.push(baston)
  }
);


gltfloader.load(
  // resource URL
  'caldero/caldero.gltf',
  // called when the resource is loaded
  function ( gltf ) {
  caldero = gltf.scene
      scene.add( caldero );

      caldero.scale.set(0.15,0.15,0.15);

      caldero.position.x=6

      caldero.traverse(subobjeto => {
          if(subobjeto.isMesh)//checamos si tiene mesh, si si, entonces le decimos que emita sombras
              subobjeto.castShadow = true;
              modelos.push(caldero)
      })
  },
  // called while loading is progressing
  function ( xhr ) {
      console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
  },
  // called when loading has errors
  function ( error ) {
      console.log( 'An error happened' );
  }
);

gltfloader.load(
  // resource URL
  'gema/piedrita.gltf',
  // called when the resource is loaded
  function ( gltf ) {
  piedrita = gltf.scene
      scene.add( piedrita );

      piedrita.scale.set(0.15,0.15,0.15);

      piedrita.position.x= 3

      piedrita.traverse(subobjeto => {
          if(subobjeto.isMesh)//checamos si tiene mesh, si si, entonces le decimos que emita sombras
              subobjeto.castShadow = true;
              modelos.push(piedrita)
      })
  },
  // called while loading is progressing
  function ( xhr ) {
      console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
  },
  // called when loading has errors
  function ( error ) {
      console.log( 'An error happened' );
  }
);


gltfloader.load(
  // resource URL
  'mochila/mochila.gltf',
  // called when the resource is loaded
  function ( gltf ) {
  mochila = gltf.scene
      scene.add( mochila );

      mochila.scale.set(0.15,0.15,0.15);

      mochila.position.x= -1
      mochila.position.y= -1

      mochila.traverse(subobjeto => {
          if(subobjeto.isMesh)//checamos si tiene mesh, si si, entonces le decimos que emita sombras
              subobjeto.castShadow = true;
              modelos.push(mochila)
      })
  },
  // called while loading is progressing
  function ( xhr ) {
      console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
  },
  // called when loading has errors
  function ( error ) {
      console.log( 'An error happened' );
  }
);


gltfloader.load(
  // resource URL
  'portal/portal.gltf',
  // called when the resource is loaded
  function ( gltf ) {
  portal = gltf.scene
      scene.add( portal );

      portal.scale.set(0.20,0.20,0.20);

      portal.position.x=-6
      portal.position.y= -1

      portal.traverse(subobjeto => {
          if(subobjeto.isMesh)//checamos si tiene mesh, si si, entonces le decimos que emita sombras
              subobjeto.castShadow = true;
              modelos.push(portal)
      })
  },
  // called while loading is progressing
  function ( xhr ) {
      console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
  },
  // called when loading has errors
  function ( error ) {
      console.log( 'An error happened' );
  }
);

gltfloader.load(
  // resource URL
  'posion 1/botella1.gltf',
  // called when the resource is loaded
  function ( gltf ) {
  botella1 = gltf.scene
      scene.add( botella1 );

      botella1.scale.set(0.10,0.10,0.10);

      botella1.position.x=-12


      botella1.traverse(subobjeto => {
          if(subobjeto.isMesh)//checamos si tiene mesh, si si, entonces le decimos que emita sombras
              subobjeto.castShadow = true;
              modelos.push(botella1)
      })
  },
  // called while loading is progressing
  function ( xhr ) {
      console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
  },
  // called when loading has errors
  function ( error ) {
      console.log( 'An error happened' );
  }
);





camera.position.z = 5;


const arregloEsferas = []
const posInicial = []

for(let i=0; i<30; i++){
    const sphereG = new THREE.SphereGeometry(0.5, 16, 8)
    const sphereM = new THREE.MeshPhongMaterial({color: 0xffffff * Math.random() })
    const sphere = new THREE.Mesh(sphereG, sphereM)
    sphere.castShadow = true
    scene.add(sphere)

    sphere.position.set( 
        Math.random() * 40 - 20,
         Math.random() * 15,
        Math.random() * 40 - 20
    )
    posInicial.push(sphere.position.clone())
    console.log(posInicial[0])

    arregloEsferas.push(sphere)
}




document.addEventListener('mousedown' , onMouseClick)

console.log(onMouseClick)

const raycaster = new THREE.Raycaster();
const mouseCoordinates = new THREE.Vector2();

function onMouseClick( event ) {

  let clickderecho= false 
  if(event.button ===2) {
    clickderecho = true
  }

  
	// calculate mouseCoordinates position in normalized device coordinates
	// (-1 to +1) for both components

	mouseCoordinates.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouseCoordinates.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

  
  raycaster.setFromCamera( mouseCoordinates , camera );

  // const intersecciones =raycaster. intersectObjects(scene.children)
  const intersecciones =raycaster. intersectObjects(modelos)


  if(intersecciones.length > 0){
    console.log(intersecciones[0].point)

    // console.log(intersecciones[0].object.material.color)
    // intersecciones[0].object.material.color.set(0x933dba)


  //   if(clickderecho){
  //     scene.attach(intersecciones[0].object)
  //   }else{
    //   sphere.attach(intersecciones[0].object)

  //   }

    
  // }

  

}






let ultimoClick= intersecciones[0]







const clock = new THREE.Clock();


function animate() {
   
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    const time = clock.getDelta();

    console.log(posInicial[0])

    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;





    if(baston!=undefined){
        baston.rotation.y +=  delta* 0.5;
    }

    if(caldero!=undefined){
        caldero.rotation.y +=  delta* 0.5;
    }
   

    if(piedrita!=undefined){
        piedrita.rotation.y += delta* 0.5;
    }
    

    if(mochila!=undefined){
        mochila.rotation.y +=  delta* 0.5;
    }
    

    if(portal!=undefined){
        portal.rotation.y += delta* 0.5;
    }
   

    if(botella1!=undefined)
    botella1.rotation.y +=  delta* 0.5;

    arregloEsferas.forEach((esfera,index)=>{

        // if(esfera.position.distanceTo(intersecciones[0].point)){
            
        // }
       
            if(ultimoClick!==undefined){
                esfera.lookAt(intersecciones[0].point);
                esfera.translateZ(delta*4);
            }else{
                esfera.lookAt(posInicial[index]);
                esfera.translateZ(delta*4);
            }
            
        
      
     
        
      
    
      
    })



    
	// if(arregloEsferas!=undefined){

        // if(shipModel.position.distanceTo() >2){
         
        //   arregloEsferas.lookAt(objetivo)
        //   arregloEsferas.translateZ(delta*2)
        // }

    // arregloEsferas[0].position.y += delta        

    // required if controls.enableDamping or controls.autoRotate are set to true
    controls.update();
    renderer.render( scene, camera );
}



window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){ //funcion para redimensionar ventana si el usuario le anda moviendo
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );
}

animate(); //Iniciamos el loop}
}
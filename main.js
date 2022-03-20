import * as THREE from 'https://cdn.skypack.dev/three@0.136';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.136/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.136/examples/jsm/controls/OrbitControls.js';
import { RGBELoader } from  'https://cdn.skypack.dev/three@0.136/examples/jsm/loaders/RGBELoader.js';


function init(){

const webgl = document.querySelector('#webgl');
const side = document.querySelectorAll('.side');
const icon = document.querySelector('#icon');
const infoheading = document.querySelector('#info-heading');
const infoparagraph = document.querySelector('#info-paragraph');

const width = webgl.offsetWidth;
const height = webgl.offsetHeight;
let model;
let item1,item2,item3,item4,item5,item6;
let point1,point2,point3;

const items = [
item1 = {
     heading: 'Zone Waterproofing',
     paragraph: 'Just some random stuff for you',
     img: 'icons/Waterproof.png',
},

item2 = {
    heading: 'LACE KEEPER',
    paragraph: 'Elastic lace keep to secure lace loops.',
    img: 'icons/LaceKeeper.png'
},

item3 = {
    heading: 'BLOOM FOOTBED',
    paragraph: 'BLOOM eco-friendly algae-based EVA footbed thanks helps clean polluted water habitats.',
    img: 'icons/Bloom.png'
},

item4 = {
    heading: 'BREATHABLE MESH',
    paragraph: 'Engineered mesh optimized for breathability and wear resistance.',
    img: 'icons/BreathableMesh.png'
},

item5 = {
    heading: 'MULTIGRIP OUTSOLE',
    paragraph: '4mm lug depth and dual-compound rubber deliver aggressive traction without sacrificing durability.',
    img: 'icons/MultiGrip.png'
},

item6 = {
    heading: 'Tpu Reinforcements',
    paragraph: 'No-sew TPU reinforces high abrasion areas for rugged durability.',
    img: 'icons/TPU.png'
}


];

for(let i = 0; i < side.length; i++){

infoheading.innerText = items[i].heading;
infoparagraph.innerText = items[i].paragraph;
};

for(let i = 0; i < side.length; i++){
    side[i].addEventListener('click', (event) =>{
        

        for(let i = 0; i < side.length; i++){
            side[i].classList.remove('active');
        }
        side[i].classList.add('active');

        icon.src = items[i].img;
        infoheading.innerText = items[i].heading;
        infoparagraph.innerText = items[i].paragraph;

    })
}


            const scene = new THREE.Scene();
            scene.background = new THREE.Color( '#F2DEC6' );
			scene.fog = new THREE.Fog( '#785c38', 5,15 );


			const camera = new THREE.PerspectiveCamera( 55, width / height, 0.1, 1000 );

			const renderer = new THREE.WebGLRenderer({antialias: true,canvas: webgl});
			renderer.setSize( width, height);
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.outputEncoding = THREE.sRGBEncoding;
            renderer.toneMapping = THREE.ACESFilmicToneMapping;
            renderer.toneMappingExposure = 1;
            
            if(width < 600){
                camera.fov = 80;
            }



            const controls = new OrbitControls( camera, renderer.domElement );
            controls.enableDamping = true;
            controls.enablePan = false;
            controls.dampingFactor = 0.06;
            controls.minDistance = 2;
            controls.maxDistance = 5.5;
            controls.maxPolarAngle = Math.PI / 2.1;



    
     
const pmremGenerator = new THREE.PMREMGenerator( renderer );
new RGBELoader().load( 'environment.hdr', function ( texture ) {

	texture.mapping = THREE.EquirectangularReflectionMapping;

	scene.environment = texture;


});


			camera.position.set(0,3,4);

const manager = new THREE.LoadingManager();
manager.onStart = function ( url, itemsLoaded, itemsTotal ) {

};

manager.onLoad = function ( ) {


};


manager.onProgress = function ( url, itemsLoaded, itemsTotal ) {

    console.log(itemsLoaded / itemsTotal);

};

manager.onError = function ( url ) {


};

function update(){
    // console.log(side);

    for(let i = 0; i < side.length; i++){
     side[i].addEventListener('click', () =>{
        anime({
            targets: camera.position,
            x: [camera.position.x, annotations[i].position.x],
            y: [camera.position.y, annotations[i].position.y],
            z: [camera.position.z, annotations[i].position.z + 1],
            duration: 1300,
            easing: 'easeInOutCubic',
            delay: 100,
       })

       anime({
        targets: controls.target,
        x: [controls.target.x, annotations[i].position.x],
        y: [controls.target.y, annotations[i].position.y],
        z: [controls.target.z, annotations[i].position.z],
        duration: 1300,
        easing: 'easeInOutCubic',
        delay: 100,


   })

     })

    };

}

// Model Loading
   const loader = new GLTFLoader(manager);
   loader.load('model/shoe.gltf',(gltf) =>{
         model = gltf.scene;
         scene.add(model)
         model.scale.set(2,2,2);
         point1 = model.getObjectByName('point1');
         update();

   });




   const annotations = [
       {
        position: new THREE.Vector3(-0.55,1.35,0.3),
        element: document.querySelector('.anno-1'),
       },

       {
        position: new THREE.Vector3(1,2,-0.3),
        element: document.querySelector('.anno-2'),
       },

       {
        position: new THREE.Vector3(3,1,-2),
        element: document.querySelector('.anno-3'),
       },

       {
        position: new THREE.Vector3(1,2,-2),
        element: document.querySelector('.anno-4'),
       },

       {
        position: new THREE.Vector3(-2,1,-2),
        element: document.querySelector('.anno-5'),   
       },

       {
        position: new THREE.Vector3(-3,0.4,-2),
        element: document.querySelector('.anno-6'),   
       },
   ]

   for(let i = 0; i < annotations.length; i++){
        
   

   annotations[i].element.addEventListener('click', () =>{

      for(let i = 0; i < side.length; i++ ){
        side[i].classList.remove('active'); 
      }

      side[i].classList.add('active');

       anime({
            targets: camera.position,
            x: [camera.position.x, annotations[i].position.x],
            y: [camera.position.y, annotations[i].position.y],
            z: [camera.position.z, annotations[0].position.z + 1],
            duration: 1300,
            easing: 'easeInOutCubic',
            delay: 100,
       })

       anime({
        targets: controls.target,
        x: [controls.target.x, annotations[i].position.x],
        y: [controls.target.y, annotations[i].position.y],
        z: [controls.target.z, annotations[i].position.z],
        easing: 'easeInOutCubic',
        duration: 1300,
        delay: 100,
      })



   })



}



         const clock = new THREE.Clock();
         let oldtime = 0;

			function animate() {
			
                const elapse = clock.getElapsedTime();
                const deltatime = elapse - oldtime;
                oldtime = deltatime;

                  
          
               controls.update();  
               
               for(const annotation of annotations){
                

                 const screenposition = annotation.position.clone();
                 screenposition.project(camera);
              

      

                 const translateX = screenposition.x * width * 0.5;
                 const translateY = - screenposition.y * height * 0.5;

                 annotation.element.style.transform = "translate" + "(" + translateX + "px" + "," + translateY + "px" + ")"; 
               }
        
      
renderer.render(scene,camera);
requestAnimationFrame( animate );
			};

			animate();

        }

        init();
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const colors={H:0x85d8ff,He:0xc7b8ff,Li:0xff86c7,Be:0x8cf4be,B:0xffce74,C:0x8de8ff,N:0x85a9ff,O:0xff7893,F:0xa0f0a0,Ne:0xffb1e0,Na:0xffc66d,Mg:0x8af0c6,Al:0xc1d1e8,Si:0xf0d780,P:0xff9f72,S:0xffd46c,Cl:0x8cff95,Ar:0xd5a7ff,K:0xd092ff,Ca:0x8dd6ff,Fe:0xff9c66,Cu:0xe9a06e,Ag:0xd9e3f4,Au:0xffd35f,U:0x72edb4};
const vec=a=>new THREE.Vector3(...a);

export class AtomScene {
  constructor(host){
    this.host=host; this.scene=new THREE.Scene(); this.scene.background=new THREE.Color(0x080d1a);
    this.camera=new THREE.PerspectiveCamera(42,1,.1,100); this.camera.position.set(0,0,7);
    try { this.renderer=new THREE.WebGLRenderer({antialias:true,alpha:true}); }
    catch { host.innerHTML='<div class="webgl-fallback">3D graphics are unavailable in this browser. Try enabling hardware acceleration or opening ATOMVERSE in a modern browser.</div>'; return; }
    this.renderer.setPixelRatio(Math.min(devicePixelRatio,1.8)); this.renderer.outputColorSpace=THREE.SRGBColorSpace; this.renderer.toneMapping=THREE.ACESFilmicToneMapping;
    this.renderer.domElement.className='science-canvas'; this.renderer.domElement.setAttribute('aria-label','Interactive 3D science model. Drag to rotate and scroll or pinch to zoom.'); host.appendChild(this.renderer.domElement);
    this.controls=new OrbitControls(this.camera,this.renderer.domElement); this.controls.enableDamping=true; this.controls.dampingFactor=.07; this.controls.minDistance=2.3; this.controls.maxDistance=15; this.controls.enablePan=true;
    this.scene.add(new THREE.HemisphereLight(0x9ddaff,0x101328,2)); const key=new THREE.PointLight(0x43bdff,30,30); key.position.set(4,3,5); this.scene.add(key); const fill=new THREE.PointLight(0x8d56ff,18,24); fill.position.set(-4,-2,-4);this.scene.add(fill);
    this.model=new THREE.Group();this.scene.add(this.model);this.clock=new THREE.Clock();this.mode='';this.onResize=()=>this.resize();window.addEventListener('resize',this.onResize);
    // The laboratory starts with display:none, so its first measurement is 0×0.
    // Observe the host so Three.js gets a real drawing buffer as soon as it opens.
    this.resizeObserver=new ResizeObserver(()=>this.resize());this.resizeObserver.observe(host);this.resize();this.animate();
  }
  resize(){if(!this.renderer)return;const w=this.host.clientWidth,h=this.host.clientHeight;if(w<2||h<2)return;this.camera.aspect=w/h;this.camera.updateProjectionMatrix();this.renderer.setSize(w,h);}
  reset(){if(!this.controls)return;const distance=this.mode==='molecule'?5.4:this.mode==='bond'?5.8:7;this.camera.position.set(0,0,distance);this.controls.target.set(0,0,0);this.controls.update();}
  clear(){while(this.model.children.length){const o=this.model.children[0];this.model.remove(o);o.traverse?.(x=>{x.geometry?.dispose();const materials=Array.isArray(x.material)?x.material:[x.material];materials.forEach(m=>{m?.map?.dispose();m?.dispose();});});}}
  pointCloud(count,shape='s',size=.028,color=0x60dfff){
    const pts=new Float32Array(count*3);let i=0;
    while(i<count){let x,y,z,r;
      if(shape==='1s'){const u=Math.random();r=-Math.log(u*Math.random()||1e-6)-Math.log(Math.random()||1e-6);r*=.34;x=(Math.random()*2-1);y=(Math.random()*2-1);z=(Math.random()*2-1);const d=Math.hypot(x,y,z)||1;x=x/d*r;y=y/d*r;z=z/d*r;}
      else {x=(Math.random()*2-1);y=(Math.random()*2-1);z=(Math.random()*2-1);r=Math.hypot(x,y,z);if(r>1||r<.08)continue;}
      // Rejection sampling weights angular density by |Y(l,m)|². Radial
      // structure is intentionally omitted in this shape-focused explorer.
      if(shape==='p'&&Math.random()>(x/r)**2)continue;
      if(shape==='d'){const angular=Math.min(1,4*x*x*y*y/(r*r*r*r));if(Math.random()>angular)continue;}
      const id=i*3;pts[id]=x;pts[id+1]=y;pts[id+2]=z;i++;
    }
    const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(pts,3));const m=new THREE.PointsMaterial({color,size,transparent:true,opacity:.57,depthWrite:false,blending:THREE.AdditiveBlending,sizeAttenuation:true});this.model.add(new THREE.Points(g,m));
  }
  sphere(position,radius,color,emissive=color){const g=new THREE.SphereGeometry(radius,28,22);const m=new THREE.MeshStandardMaterial({color,emissive,emissiveIntensity:.45,roughness:.28,metalness:.18});const o=new THREE.Mesh(g,m);o.position.copy(position);this.model.add(o);const glow=new THREE.Mesh(new THREE.SphereGeometry(radius*1.35,20,16),new THREE.MeshBasicMaterial({color,transparent:true,opacity:.11,depthWrite:false}));glow.position.copy(position);this.model.add(glow);return o;}
  bond(a,b,r=.035){const d=new THREE.Vector3().subVectors(b,a);const mesh=new THREE.Mesh(new THREE.CylinderGeometry(r,r,d.length(),12),new THREE.MeshStandardMaterial({color:0x94bad0,emissive:0x376d8c,emissiveIntensity:.5,metalness:.4,roughness:.4}));mesh.position.copy(a).add(b).multiplyScalar(.5);mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),d.normalize());this.model.add(mesh);}
  label(text,pos,color='#e3f2ff'){const c=document.createElement('canvas'),ctx=c.getContext('2d');c.width=256;c.height=128;ctx.font='bold 72px Inter,Arial';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillStyle=color;ctx.shadowColor=color;ctx.shadowBlur=18;ctx.fillText(text,128,64);const t=new THREE.CanvasTexture(c);const s=new THREE.Sprite(new THREE.SpriteMaterial({map:t,transparent:true,depthWrite:false}));s.position.copy(pos);s.scale.set(.8,.4,1);this.model.add(s);}
  nucleus(protons=1,neutrons=0){const total=protons+neutrons;for(let i=0;i<total;i++){const p=new THREE.Vector3((Math.random()-.5)*.42,(Math.random()-.5)*.42,(Math.random()-.5)*.42);this.sphere(p,total<5?.135:.105,i<protons?0xff5e88:0xffbd6c);}}
  makeAtom(protons=8,electrons=8,neutrons=8,cloud=false,showNucleus=true){
    this.clear();this.mode='atom';
    if(cloud){this.pointCloud(7000,'1s',.027);if(showNucleus)this.nucleus(1,0);return;}
    if(showNucleus)this.nucleus(protons,neutrons);
    let remaining=electrons,shell=0;const firstTwenty=[2,8,8,2];
    while(remaining>0){const cap=firstTwenty[shell]??18,n=Math.min(remaining,cap);remaining-=n;const radius=1.05+shell*.52;const line=new THREE.Mesh(new THREE.TorusGeometry(radius,.006,5,100),new THREE.MeshBasicMaterial({color:0x34748f,transparent:true,opacity:.45}));line.rotation.x=Math.PI/2;this.model.add(line);for(let j=0;j<n;j++){const a=2*Math.PI*j/n+shell*.36;const p=new THREE.Vector3(Math.cos(a)*radius,Math.sin(a)*radius,Math.sin(a*2+shell)*.12);this.sphere(p,.075,0x71e7ff);}shell++;}
  }
  makeMolecule(data){
    this.clear();this.mode='molecule';const center=vec([0,0,0]);this.sphere(center,.32,colors[data.center]||0xffc85b);this.label(data.center,new THREE.Vector3(0,0,.36));
    data.positions.forEach((p,i)=>{const v=vec(p),order=data.bondOrders?.[i]||1;const direction=v.clone().sub(center).normalize();const reference=Math.abs(direction.z)>.9?new THREE.Vector3(0,1,0):new THREE.Vector3(0,0,1);const offset=new THREE.Vector3().crossVectors(direction,reference).normalize().multiplyScalar(.075);for(let n=0;n<order;n++){const shift=offset.clone().multiplyScalar(n-(order-1)/2);this.bond(center.clone().add(shift),v.clone().add(shift));}this.sphere(v,.22,colors[data.outer[i]]||0x79dfff);this.label(data.outer[i],v.clone().add(new THREE.Vector3(0,0,.28)));});
    (data.lonePositions||[]).forEach(p=>{const v=vec(p);this.sphere(v,.105,0x9f78ff);this.label('••',v.clone().add(new THREE.Vector3(0,.2,0)),'#c7a8ff');});
  }
  makeBond(data){this.clear();this.mode='bond';if(data.kind==='Ionic'){
      // Rock-salt (NaCl) is two interpenetrating FCC ion arrays. This 3×3×3
      // checkerboard is a small, schematic fragment with six unlike nearest neighbours.
      for(let i=-1;i<=1;i++)for(let j=-1;j<=1;j++)for(let k=-1;k<=1;k++){const p=vec([i*.7,j*.7,k*.7]),isNa=(i+j+k)%2===0;this.sphere(p,isNa?.16:.21,isNa?0xffc66d:0x82f09c);}
      this.label('Na⁺',vec([0,1.03,0]));this.label('Cl⁻',vec([.7,1.03,0]));
    }
    else {const pts=data.atoms.length===2?[vec([-.95,0,0]),vec([.95,0,0])]:[vec([0,.4,0]),vec([-.79,-.212,0]),vec([.79,-.212,0])];data.atoms.forEach((symbol,i)=>{const key=symbol.replace(/[+−-]/g,'');this.sphere(pts[i],symbol==='O'?.4:.3,colors[key]||0x88dfff);this.label(symbol,pts[i].clone().add(new THREE.Vector3(0,.48,0)));});if(pts.length===2){const count=data.order||1;for(let i=0;i<count;i++)this.bond(pts[0].clone().add(new THREE.Vector3(0,0,(i-(count-1)/2)*.12)),pts[1].clone().add(new THREE.Vector3(0,0,(i-(count-1)/2)*.12)),.035);}else{this.bond(pts[0],pts[1]);this.bond(pts[0],pts[2]);const lone1=vec([0,.75,.606]),lone2=vec([0,.75,-.606]);this.sphere(lone1,.09,0xa58aff);this.sphere(lone2,.09,0xa58aff);this.label('••',lone1.clone().add(new THREE.Vector3(0,.13,0)),'#c7a8ff');this.label('••',lone2.clone().add(new THREE.Vector3(0,.13,0)),'#c7a8ff');}}
  }
  set(name,config={}){if(!this.renderer)return;const priorMode=this.mode;if(name==='atom')this.makeAtom(config.protons,config.electrons,config.neutrons,config.cloud,config.showNucleus);else if(name==='cloud'){this.clear();this.mode='cloud';this.pointCloud(config.count||6500,'1s',config.size||.027);if(config.showNucleus!==false)this.nucleus(1,0);}else if(name==='orbital'){this.clear();this.mode='orbital';this.pointCloud(config.count||5000,config.shape||'s',config.size||.03,config.color||0x60dfff);this.nucleus(1,0);}else if(name==='molecule')this.makeMolecule(config.data);else if(name==='bond')this.makeBond(config.data);if(priorMode!==name)this.reset();}
  animate(){if(!this.renderer)return;requestAnimationFrame(()=>this.animate());const t=this.clock.getElapsedTime();if(this.mode==='cloud'||this.mode==='orbital'){this.model.rotation.y=t*.045;this.model.rotation.x=Math.sin(t*.12)*.035;}else if(this.mode==='atom')this.model.rotation.y=t*.09;this.controls.update();this.renderer.render(this.scene,this.camera);}
}

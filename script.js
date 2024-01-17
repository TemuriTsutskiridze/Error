const blogcardjs=document.querySelector(".blog-card")
async function renderDATA(){
    const response =await fetch("./data.json")
    const data=await response.json();
    for(let post of data){
        blogcardjs.innerHTML+=`
         <div class="card-1">
    <img src="${post.image}" alt="">
    <div class="card-body">
      <div class="card-body-p">
      <h1>${post.title}</h1>
      <p>${post.publish_date}</p>
        
      </div>
      <div class="card-body-h1">
      <h1>${post.description}</h1>  
      </div>
      <div class="card-body-btn">
        <button class="btn-filter1-btn" onclick=""><h4>მარკეტი</h4></button>
        <button  class="btn-filter2-btn" onclick=""><h4>აპლიკაცია </h4></button>
        <button  class="btn-filter3-btn" onclick=""><h4>ხელოვნური ინტელექტი</h4></button>


      </div>
      <div class="card-body-pp">
        <p>6 თვის შემდეგ ყველის ბრმა დეგუსტაციის დროც <br>
           დადგა. მაქსიმალური სიზუსტისთვის, ეს პროცესი...</p>
      </div>
       <div class="clicl-here">
        <button class="clicl-here-btn" onclick="seeall(${post.id})">სრულად ნახვა() <img src="/photo/Arrow.png" alt=""></button>

       </div>
    </div>

  </div>
 </div>
  
</div>
        `;
    }
}

function seeall(id){
console.log(id)
}
renderDATA()
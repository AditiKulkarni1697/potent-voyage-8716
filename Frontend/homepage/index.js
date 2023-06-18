let imageTag = document.querySelector("#uv");
    let currentIndex = 0;
    let imageArr = [
      "https://www.getharvest.com/hs-fs/hubfs/homepage/home-photo-zehner.jpg?width=840&height=561&name=home-photo-zehner.jpg",
      "https://www.getharvest.com/hs-fs/hubfs/homepage/home-photo-dovetail.jpg?width=840&height=561&name=home-photo-dovetail.jpg",
      "https://www.getharvest.com/hs-fs/hubfs/homepage/home-photo-cooper.jpg?width=840&height=561&name=home-photo-cooper.jpg",
      "https://www.getharvest.com/hs-fs/hubfs/homepage/home-photo-luminary.jpg?width=840&height=561&name=home-photo-luminary.jpg"];
      function myslide(){
        document.getElementById("uv").src=imageArr[currentIndex];
        if(currentIndex < imageArr.length-1){
            currentIndex++;
        }
        else{
            currentIndex=0;
        }
        setTimeout("myslide()",2000);
      }
      window.onload=myslide;

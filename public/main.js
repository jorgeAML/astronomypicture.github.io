fetch('https://api.nasa.gov/planetary/apod?api_key=mGF2HwXeB42ahOBgZOYYCSWRrSGRivjk8mfLyWlA')
  .then(response => response.json())
  .then(data => {
      if (data.media_type == 'image') {
        const app = document.getElementById('api');

      const image = document.createElement('img');
      image.setAttribute('class', 'apodImg');
      image.src = `${data.url}`;
      app.append(image);
      
      /*CONSOLE*/
      console.info('The JSON response will appear if we got success!');
      console.log(data.status);
      console.log(data);
      } else { 
          console.info('the conditional is working, appear that the JSON response have a 404 code');
          console.error('we have a 404 error here, but we know how to deal with it.');
          const selectId = document.getElementById('api');
          
          const createImg = document.createElement('img');
          createImg.setAttribute('src', './images/CygnusFilament_HubbleShatz_1080.jpg');
          selectId.append(createImg);
      }
      
    });
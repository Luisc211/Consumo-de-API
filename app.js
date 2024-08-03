document.addEventListener('DOMContentLoaded', function() {
  console.log("DOM fully loaded and parsed");

  fetch('http://127.0.0.1:8000/api/listaHorario', {//Ingresamos la ruta de nuyestra api, debemos tener corriendo el servidor 8000
      method: 'GET',//El metodo debe ser el mismo que declaramos en el proyecto php laravel
      headers: {
          'Content-Type': 'application/json'
      }
  })
  .then(response => {
      console.log("Response received");
      if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
  })
  .then(data => {
      console.log("Data parsed: ", data);
      const container = document.querySelector('.data-container');
      data.forEach(item => {
          const div = document.createElement('div');
          div.className = 'data-item';

          //Aqui elimino los campos id y fecha de creación para que no se muestren
          const { id, created_at, updated_at, ...filteredItem } = item;
          console.log("Filtered item: ", filteredItem);

          for (const key in filteredItem) {
              const p = document.createElement('p');
              p.textContent = `${capitalizeFirstLetter(key)}: ${filteredItem[key]}`;
              div.appendChild(p);
          }
          container.appendChild(div);
      });
  })
  .catch(error => console.error('Error:', error));
});

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}










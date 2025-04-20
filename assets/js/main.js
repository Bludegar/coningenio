const urlServicios = "https://ciisa.coningenio.cl/v1/services/";
const urlNosotros = "https://ciisa.coningenio.cl/v1/about-us/";

function obtenerServicios() {
  return fetch(urlServicios, {
    method: "GET",
    headers: {
      "Authorization": "Bearer ciisa",
      "Accept": "application/json"
    }
  })
    .then(res => {
      if (!res.ok) {
        throw new Error("No se pudo acceder al GET por permisos");
      }
      return res.json();
    })
    .then(data => data.data)
    .catch(err => {
      console.error("Error al obtener servicios:", err);
      console.log("Usando mock para servicios...");
      return mockServicios(); 
    });
}

function obtenerNosotros() {
  return fetch(urlNosotros, {
    method: "GET",
    headers: {
      "Authorization": "Bearer ciisa",
      "Accept": "application/json"
    }
  })
    .then(res => {
      if (!res.ok) {
        throw new Error("No se pudo acceder al GET por permisos");
      }
      return res.json();
    })
    .then(data => data.data)
    .catch(err => {
      console.error("Error al obtener nosotros:", err);
      console.log("Usando mock para nosotros...");
      return mockNosotros(); 
    });
}

function mostrarServicios(services) {
  const container = document.getElementById("services-container");

  services.forEach(item => {
    const col = document.createElement("div");
    col.className = "col-md-12 col-lg-6 mb-4";
    col.innerHTML = `
      <div class="p-3 border rounded service-card-dynamic shadow-sm h-100"> 
        <h4>${item.titulo.esp}</h4>
        <p>${item.descripcion.esp}</p>
      </div>
    `;
    container.appendChild(col);
  });
}

function mostrarNosotros(nosotros) {
    const container = document.getElementById("about-us-container");
  
    nosotros.forEach((item, index) => {
      const section = document.createElement("div");
  
      if (index === 0) {
        section.className = "col-12 mb-4";
        section.innerHTML = `
          <h3 class="mb-3">${item.titulo.esp}</h3>
          <p>${item.descripcion.esp}</p>
        `;
      } else {
        section.className = "col-6 mb-4";
        section.innerHTML = `
          <h3>${item.titulo.esp}</h3>
          <p>${item.descripcion.esp}</p>
        `;
      }
  
      container.appendChild(section);
    });
  }
  

function mockServicios() {
  return [
    {
      id: 1,
      titulo: { esp: "Consultoría digital" },
      descripcion: { esp: "Identificamos las fallas y conectamos los puntos entre tu negocio y tu estrategia digital. Nuestro equipo experto cuenta con años de experiencia en la definición de estrategias y hojas de ruta en función de tus objetivos específicos." }
    },
    {
      id: 2,
      titulo: { esp: "Soluciones multiexperiencia" },
      descripcion: { esp: "Deleitamos a las personas usuarias con experiencias interconectadas a través de aplicaciones web, móviles, interfaces conversacionales, digital twin, IoT y AR. Su arquitectura puede adaptarse y evolucionar para adaptarse a los cambios de tu organización." }
    },
    {
      id: 3,
      titulo: { esp: "Evolución de ecosistemas" },
      descripcion: { esp: "Ayudamos a las empresas a evolucionar y ejecutar sus aplicaciones de forma eficiente, desplegando equipos especializados en la modernización y el mantenimiento de ecosistemas técnicos. Creando soluciones robustas en tecnologías de vanguardia." }
    },
    {
      id: 4,
      titulo: { esp: "Soluciones Low-Code" },
      descripcion: { esp: "Traemos el poder de las soluciones low-code y no-code para ayudar a nuestros clientes a acelerar su salida al mercado y añadir valor. Aumentamos la productividad y la calidad, reduciendo los requisitos de cualificación de los desarrolladores." }
    }
  ];
}

function mockNosotros() {
  return [
    {
      titulo: { esp: "Servicios de soporte, gestión y diseño de TI altamente personalizados." },
      descripcion: { esp: "Acelere la innovación con equipos tecnológicos de clase mundial. Lo conectaremos con un equipo remoto completo de increíbles talentos independientes para todas sus necesidades de desarrollo de software." }
    },
    {
      titulo: { esp: "Misión" },
      descripcion: { esp: "Nuestra misión es ofrecer soluciones digitales innovadoras y de alta calidad que impulsen el éxito de nuestros clientes, ayudándolos a alcanzar sus objetivos empresariales a través de la tecnología y la creatividad." }
    },
    {
      titulo: { esp: "Visión" },
      descripcion: { esp: "Nos visualizamos como líderes en el campo de la consultoría y desarrollo de software, reconocidos por nuestra excelencia en el servicio al cliente, nuestra capacidad para adaptarnos a las necesidades cambiantes del mercado y nuestra contribución al crecimiento y la transformación digital de las empresas." }
    }
  ];
}

Promise.all([obtenerServicios(), obtenerNosotros()])
  .then(([servicios, nosotros]) => {
    mostrarServicios(servicios);
    mostrarNosotros(nosotros);
  })
  .catch(err => {
    console.error("Error al obtener los datos:", err);
  });

  document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault(); 

    const name = document.getElementById("name").value.trim();
    const service = document.getElementById("service").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !service || !message) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    console.log("Formulario enviado:");
    console.log("Nombre:", name);
    console.log("Servicio seleccionado:", service);
    console.log("Mensaje:", message);

    alert("Enviado :P");
    this.reset(); 
  });

  document.getElementById("toggle-dark").addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
  
    const isDark = document.body.classList.contains("dark-mode");
    this.textContent = isDark ? "Modo claro" : "Modo nocturno";
  });
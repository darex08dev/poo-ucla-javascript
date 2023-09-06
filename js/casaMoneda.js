//Modelos

class Cliente {

   constructor(id = null, valorBillete = 0, cant10 = 0, cant20 = 0, cant50 = 0) {

      this.id = id;
      this.valorBillete = valorBillete;
      this.cant10 = cant10;
      this.cant20 = cant20;
      this.cant50 = cant50;
   }

   set id(i) {this._id = +i;}
   get id() {return this._id;}

   set valorBillete(v) {this._valorBillete = +v;}
   get valorBillete() {return this._valorBillete;}

   set cant10(c10) {this._cant10 = +c10}
   get cant10() {return this._cant10;}

   set cant20(c20) {this._cant20 = +c20}
   get cant20() {return this._cant20;}

   set cant50(c50) {this._cant50 = +c50}
   get cant50() {return this._cant50;}

   totalCambiado() {

      return (this.cant10 + this.cant20 + this.cant50);
   }

   valor10() { return this.cant10 * 10;}
   valor20() { return this.cant20 * 20;}
   valor50() { return this.cant50 * 50;}
}

class CasaMoneda {

   constructor() {

      this.arrCliente = [];
      this.cant10 = 15;
      this.cant20 = 15;
      this.cant50 = 15;
   }

   agregar(cliente) {

      let bolAdd = false;

      if (cliente.cant10 >= 0 && cliente.cant20 >= 0 && cliente.cant50 >= 0) {

         let valorTotal = cliente.valor10() + cliente.valor20() + cliente.valor50();

         if (this.cant10 >= cliente.cant10 && this.cant20 >= cliente.cant20 && this.cant50 >= cliente.cant50 && valorTotal === cliente.valorBillete) {

         this.arrCliente.push(cliente);
         this.cant10 -= cliente.cant10;
         this.cant20 -= cliente.cant20;
         this.cant50 -= cliente.cant50;

         bolAdd = true;

         }
      }

      return bolAdd;
   }

   eliminar(id) {

      for (let i = 0; i < this.arrCliente.length; i++) {

         if (this.arrCliente[i].id === id) {

            this.cant10 += this.arrCliente[i].cant10;
            this.cant20 += this.arrCliente[i].cant20;
            this.cant50 += this.arrCliente[i].cant50;
            this.arrCliente.splice(i, 1);
            i--;
         }
      }
   }

   existe(id) {

      let existe = false;
      this.arrCliente.forEach( (cliente) => {
         
         if (cliente.id === id) {

            existe = true;
         }
      });
      return existe;
   }

   cantFinal() {

      let totalFinal = 0;

      this.arrCliente.forEach( (cliente) => {
         
         totalFinal += cliente.valorBillete;
      });
      return totalFinal;
   }

   cant100() {

      let cant100 = 0;

      this.arrCliente.forEach( (cliente) => {
         
         if (cliente.valorBillete === 100) {
         cant100 ++;
         }

      });
      return cant100;
   }
}

//Vistas

class Vista {constructor(app) { this.app = app;}}

class vCliente extends Vista {

   agregar(){

      let cliente = new Cliente();
      cliente.id = +prompt("Ingrese el ID del cliente");

      if (this.app.mCasaMoneda.existe(cliente.id)) {

         alert("El ID ya existe");

      } else {
            
         cliente.valorBillete = +prompt("Ingrese el valor del billete a cambiar");

         if (cliente.valorBillete === 100 || cliente.valorBillete === 50 || cliente.valorBillete === 20) {
            
            cliente.cant10 = +prompt("Ingrese la cantidad de billetes de $10 que desea recibir");
            cliente.cant20 = +prompt("Ingrese la cantidad de billetes de $20 que desea recibir");
            cliente.cant50 = +prompt("Ingrese la cantidad de billetes de $50 que desea recibir");

            if (!this.app.mCasaMoneda.agregar(cliente)) {

            alert("Operación no válida");

            } else {

               alert("Cliente agregado correctamente");
            
            }

         } else {

            alert("La casa solo admite billetes de $100, $50 o $20");
         }

      }
   }

   eliminar() {

      let id = +prompt("Ingrese el id del cliente a eliminar");

         if (this.app.mCasaMoneda.existe(id)) {

            if (confirm(`Seguro que desea eliminar el cliente ${id}`)) {

               this.app.mCasaMoneda.eliminar(id);
               alert("Cliente eliminado correctamente");
            }

         } else {

            alert("El Cliente no existe");
      }
   }
}

class vCasaMoneda extends Vista {

   constructor(app) {

      super(app);
      this.btnAdd = document.getElementById('add');
      this.btnDelete = document.getElementById('delete');
      this.btnAdd.onclick = () => {
         this.app.vCliente.agregar();
         this.listar();
      };
      this.btnDelete.onclick = () => {
         this.app.vCliente.eliminar();
         this.listar();
      };
      this.salida = document.getElementById('salida');
      this.template = this.salida.children[0].cloneNode(true);
      this.totalFinalCambiado = document.getElementById('totalCambiado');
      this.vCant10 = document.getElementById('c10');
      this.vCant20 = document.getElementById('c20');
      this.vCant50 = document.getElementById('c50');
      this.vCant100 = document.getElementById('c100');
   }

   listar() {

      while (this.salida.children[0] !== undefined) {
         
         this.salida.children[0].remove();
      }
      this.app.mCasaMoneda.arrCliente.forEach((cliente) => {
         let html = this.template.cloneNode(true);
         html.getElementsByClassName("id_cliente")[0].innerHTML = cliente.id;
         html.getElementsByClassName("valor_billete")[0].innerHTML = `$${cliente.valorBillete}`;
         html.getElementsByClassName("cant_10")[0].innerHTML = cliente.cant10;
         html.getElementsByClassName("cant_20")[0].innerHTML = cliente.cant20;
         html.getElementsByClassName("cant_50")[0].innerHTML = cliente.cant50;
         html.getElementsByClassName("total_billete")[0].innerHTML = cliente.totalCambiado();
         this.salida.appendChild(html);
      });
      this.vCant10.innerHTML = this.app.mCasaMoneda.cant10;
      this.vCant20.innerHTML = this.app.mCasaMoneda.cant20;
      this.vCant50.innerHTML = this.app.mCasaMoneda.cant50;
      this.totalFinalCambiado.innerHTML = `$${this.app.mCasaMoneda.cantFinal()}`;
      this.vCant100.innerHTML = this.app.mCasaMoneda.cant100();
   }
}


//Controladores

class App {

   constructor() {

      this.mCliente = new Cliente();
      this.mCasaMoneda = new CasaMoneda();
      this.vCliente = new vCliente(this);
      this.vCasaMoneda = new vCasaMoneda(this);
      this.cargarDatos();
   }

   cargarDatos() {

      this.mCasaMoneda.agregar(new Cliente(1,20,2));
      this.mCasaMoneda.agregar(new Cliente(2,50,3,1));
      this.mCasaMoneda.agregar(new Cliente(3,100,3,1,1));
      this.vCasaMoneda.listar();
   }
}

let app = new App();
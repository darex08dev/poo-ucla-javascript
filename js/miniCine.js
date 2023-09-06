class Cinefilo {

	constructor(id, sala, nino = 0, adulto = 0) {

		this.id = id;
		this.sala = sala;
		this.nino = nino;
		this.adulto = adulto;

	}

	//Setters and Getters

	set id(i) {this._id = +i;}
	get id() {return this._id;}

	set sala(s) {this._sala = +s;}
	get sala() {return this._sala;}

	set nino(n) {this._nino = +n;}
	get nino() {return this._nino;}

	set adulto(a) {this._adulto = +a;}
	get adulto() {return this._adulto;}

	//Funciones

	nombrePelicula() {

		let nombre;

		switch (this.sala) {

			case 1:
				nombre = "Super Mario Bros";
				break;
			case 2:
				nombre = "Oppenheimer";
				break;
			case 3:
				nombre = "Sound of Freedom";
				break;
		}
		return nombre;
	}

	totalEntradas() {

		let total = this.nino + this.adulto;

		return total;

	}

	totalPagar() {

		return (this.nino * 1) + (this.adulto * 2);
	}
}

class MiniCine {

	constructor() {

		this.arrCinefilo = [];
		this.max1 = 30;
		this.max2 = 20;
		this.max3 = 10;
		this.cont1 = 0;
		this.cont2 = 0;
		this.cont3 = 0;
	}

	agregar(cinefilo) {

		let boolAdd = false;

		if (cinefilo.totalEntradas() > 0) {

			switch (cinefilo.sala) {

				case 1:
					
					if (this.max1 >= cinefilo.totalEntradas()) {

						this.max1 -= cinefilo.totalEntradas();
						this.cont1 += cinefilo.totalEntradas();
						boolAdd = true;
						this.arrCinefilo.push(cinefilo);
					}
					break;

				case 2:
					
					if (this.max2 >= cinefilo.totalEntradas()) {

						this.max2 -= cinefilo.totalEntradas();
						this.cont2 += cinefilo.totalEntradas();
						boolAdd = true;
						this.arrCinefilo.push(cinefilo);
					}
					break;

				case 3:
					
					if (this.max3 >= cinefilo.totalEntradas()) {

						this.max3 -= cinefilo.totalEntradas();
						this.cont3 += cinefilo.totalEntradas();
						boolAdd = true;
						this.arrCinefilo.push(cinefilo);
					}
					break;
			}
		}
		return boolAdd;
	}

	eliminar(id) {

		for (let i = 0; i < this.arrCinefilo.length; i++) {
			
			if (this.arrCinefilo[i].id === id) {

				switch (this.arrCinefilo[i].sala) {

					case 1:
						
						this.cont1 -= this.arrCinefilo[i].totalEntradas();
						this.max1 += this.arrCinefilo[i].totalEntradas();
						this.arrCinefilo.splice(i, 1);
						break;

					case 2:
						
						this.cont2 -= this.arrCinefilo[i].totalEntradas();
						this.max2 += this.arrCinefilo[i].totalEntradas();
						this.arrCinefilo.splice(i, 1);
						break

					case 3:
						
						this.cont3 -= this.arrCinefilo[i].totalEntradas();
						this.max3 += this.arrCinefilo[i].totalEntradas();
						this.arrCinefilo.splice(i, 1);
						break
				}
				i--;
			}
		}
	}

	existe(id) {

		let existe = false;

		this.arrCinefilo.forEach((cinefilo) => {

			if (cinefilo.id === id) {

				existe = true;
			}
		});
		return existe;
	}

	entradasVendidas() {

		let total = 0;

		this.arrCinefilo.forEach( (cinefilo) => {

			total += cinefilo.totalEntradas();
		});
		return total;
	}

	montoTotal() {

		let total = 0;

		this.arrCinefilo.forEach( (cinefilo) => {

			total += cinefilo.totalPagar();
		});
		return total;
	}

	masTaquillera() {

		let peliculaTaquillera = "";
		let maxRecaudo = 0;

		this.arrCinefilo.forEach((cinefilo) => {

			const recaudacion =cinefilo.totalPagar();

			if (recaudacion > maxRecaudo) {

				maxRecaudo = recaudacion;
				peliculaTaquillera = cinefilo.nombrePelicula()
			}
		});

		return peliculaTaquillera;
	}
 }

class Vista {constructor(app){this.app = app;}}

class vCinefilo extends Vista {

	agregar() {

		let cinefilo = new Cinefilo();

		cinefilo.id = +prompt("Ingrese el id del cinefilo");

		while (cinefilo.id === "" || cinefilo <= 0) {

			cinefilo.id = +prompt("Ingrese un id válido");
		}

		if (this.app.mMiniCine.existe(cinefilo.id)) {

			alert("El id ya se encuentra registrado");

		} else {

			cinefilo.sala = +prompt("Ingrese la sala a la cual quiere asistir");
			cinefilo.nino = +prompt("Ingrese la cantidad de niños");
			cinefilo.adulto = +prompt("Ingrese la cantidad de adultos");

			if (!this.app.mMiniCine.agregar(cinefilo)) {

				alert("No se pudo completar su solicitud");
			}
		}
	}

	eliminar() {

		let id = +prompt("Ingrese el id del cinefilo a eliminar");

		if (this.app.mMiniCine.existe(id)) {

			if (confirm(`Seguro que desea eliminar el cinefilo ${id}`)) {

				this.app.mMiniCine.eliminar(id);
			}

		} else {
				
				alert("El cinefilo no existe");
			}
	}
}

class vMiniCine extends Vista {

	constructor(app) {
		super(app);
		this.btnAdd = document.getElementById('add');
		this.btnDelete = document.getElementById('delete');
		this.btnAdd.onclick = () => {
			this.app.vCinefilo.agregar();
			this.listar();
		}
		this.btnDelete.onclick = () => {
			this.app.vCinefilo.eliminar();
			this.listar();
		}
		this.salida = document.getElementById('salida');
		this.template = this.salida.children[0].cloneNode(true);
		this.max1 =  document.getElementById('max1');
		this.tot1 = document.getElementById('tot1');
		this.max2 = document.getElementById('max2');
		this.tot2 = document.getElementById('tot2');
		this.max3 = document.getElementById('max3');
		this.tot3 = document.getElementById('tot3');
		this.total = document.getElementById('total');
		this.taquilla = document.getElementById('taquilla');
		this.entradas = document.getElementById('entradas');
	}

	listar() {

		while (this.salida.children[0] !== undefined) {
			
			this.salida.children[0].remove();
		}

		this.app.mMiniCine.arrCinefilo.forEach( (cinefilo) => {
			
			let html = this.template.cloneNode(true);
			html.getElementsByClassName('id_cine')[0].innerHTML = cinefilo.id;
			html.getElementsByClassName('peli')[0].innerHTML = cinefilo.nombrePelicula();
			html.getElementsByClassName('nino')[0].innerHTML = cinefilo.nino;
			html.getElementsByClassName('adulto')[0].innerHTML = cinefilo.adulto;
			html.getElementsByClassName('totalPagar')[0].innerHTML = `$${cinefilo.totalPagar()}`;
			this.salida.appendChild(html);
		});
		this.max1.innerHTML = this.app.mMiniCine.max1;
		this.max2.innerHTML = this.app.mMiniCine.max2;
		this.max3.innerHTML = this.app.mMiniCine.max3;
		this.tot1.innerHTML = this.app.mMiniCine.cont1;
		this.tot2.innerHTML = this.app.mMiniCine.cont2;
		this.tot3.innerHTML = this.app.mMiniCine.cont3;
		this.total.innerHTML = `$${this.app.mMiniCine.montoTotal()}`;
		this.taquilla.innerHTML = this.app.mMiniCine.masTaquillera();
		this.entradas.innerHTML = this.app.mMiniCine.entradasVendidas();
	}
}

class App {

	constructor() {

		this.mCinefilo = new Cinefilo();
		this.mMiniCine = new MiniCine()
		this.vCinefilo = new vCinefilo(this);
		this.vMiniCine = new vMiniCine(this);
		this.cargarDatos();
	}

	cargarDatos() {
		this.mMiniCine.agregar(new Cinefilo(1,1,4,2));
		this.mMiniCine.agregar(new Cinefilo(2,1,6,3));
		this.mMiniCine.agregar(new Cinefilo(3,2,0,5));
		this.mMiniCine.agregar(new Cinefilo(4,3,3,4));
		this.mMiniCine.agregar(new Cinefilo(5,1,3,1));
		this.vMiniCine.listar();
	}
}

const app = new App();
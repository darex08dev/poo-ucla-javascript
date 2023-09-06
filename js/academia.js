class Aspirante {

	constructor(id, nombre, condicion, curso) {
		this.id = id;
		this.nombre = nombre;
		this.condicion = condicion;
		this.curso = curso;
	}

	//Setters and Getters

	set id(i) {this._id = +i;}
	get id() {return this._id;}

	set nombre(n) {this._nombre = n;}
	get nombre() {return this._nombre;}

	set condicion(co) {this._condicion = co;}
	get condicion() {return this._condicion;}

	set curso(cu) {this._curso = +cu;}
	get curso() {return this._curso;}

	precioCurso() {

		let precio;

		switch (this.curso) {
			case 1:
				precio = 30;
				break;
			case 2:
				precio = 25;
				break;
			case 3:
				precio = 20;
				break;
		}
		return precio;
	}

	nombreCurso() {

		let nombre;

		switch (this.curso) {
			case 1:
				nombre = "Programación";
				break;
			case 2:
				nombre = "Matemáticas";
				break;
			case 3:
				nombre = "Inglés";
				break;
		}
		return nombre;
	}

	descuento() {

		let precio = this.precioCurso();
		let descuento = 0;

		if (this.condicion === "si") {

			descuento = precio * 0.5;
		}
		return descuento;
	}

	totalPagar() {

		return this.precioCurso() - this.descuento();
	}
}

class Academia {

	constructor() {
		this.arrAspirante = [];
		this.cont1 = 0;
		this.cont2 = 0;
		this.cont3 = 0;
		this.max1 = 5;
		this.max2 = 5;
		this.max3 = 5;
	}

	agregar(aspirante) {

		let boolAdd = false;

			if (aspirante.curso >= 1 && aspirante.curso <= 3) {

				switch (aspirante.curso) {

					case 1:

						if (this.max1 > 0) {

							this.cont1++;
							this.max1--;
							boolAdd = true;
							this.arrAspirante.push(aspirante);
						}
						break;

					case 2:

						if (this.max2 > 0) {

							this.cont2++;
							this.max2--;
							boolAdd = true;
							this.arrAspirante.push(aspirante);
						}
						break;

					case 3:

						if (this.max3 > 0) {

							this.cont3++;
							this.max3--;
							boolAdd = true;
							this.arrAspirante.push(aspirante);
						}
						break;
				}
			}

		return boolAdd;
	}

	eliminar(id) {

		for(let i = 0; i < this.arrAspirante.length; i++) {

			if (this.arrAspirante[i].id === id) {

				switch (this.arrAspirante[i].curso) {

					case 1:

						this.cont1--;
						this.max1++;
						this.arrAspirante.splice(i, 1);
						break;

					case 2:

						this.cont2--;
						this.max2++;
						this.arrAspirante.splice(i, 1);
						break;

					case 3:

						this.cont3--;
						this.max3++;
						this.arrAspirante.splice(i, 1);
						break;
				}
				
				i--;
			}
		}
	}

	existe(id) {

		let existe = false;

		this.arrAspirante.forEach( (aspirante) => {
			
			if (aspirante.id === id) {

				existe = true;
			}
		});
		return existe;
	}

	totalDescuentos() {

		let descuentos = 0;

		this.arrAspirante.forEach( (aspirante) => {
			
			descuentos += aspirante.descuento();
		});
		return descuentos;
	}
}

class Vista {constructor(app){this.app = app;}}

class vAspirante extends Vista{

	agregar() {

		let aspirante = new Aspirante();
		aspirante.id = +prompt("Ingrese su el id del aspirante");

		while (aspirante.id <= 0 || aspirante.id === "") {
				
				aspirante.id = prompt("El aspirante debe poseer un id válido");
			}

		if (this.app.mAcademia.existe(aspirante.id)) {

			alert("El id ya está registrado");

		} else {

			aspirante.nombre = prompt("Ingrese su nombre");

			while (aspirante.nombre === "") {
				
				aspirante.nombre = prompt("El aspirante debe poseer un nombre");
			}

			aspirante.condicion = prompt(`Si el estudiante es becado, ingrese "si". De lo contrario, ingrese "no"`).toLowerCase();

			if (aspirante.condicion === "si" || aspirante.condicion === "no") {

					aspirante.curso = +prompt("Ingresa el id del curso");

					if (this.app.mAcademia.agregar(aspirante)) {

						alert("Aspirante agregado correctamente");

					} else {
						
						alert("Operación no válida");
					}

			} else {

				alert("La opción no es válida");
			}
			
		}
	}

	eliminar() {

		let id = +prompt("Ingrese el id del aspirante a eliminar");

		if (this.app.mAcademia.existe(id)) {

			if (confirm(`Seguro que desea eliminar el aspinante ${id}`)) {

				this.app.mAcademia.eliminar(id);
				alert("Aspirante eliminado correctamente");
			}

		} else {

			alert("No existe aspirante con ese id");
			
		}
	}
}

class vAcademia extends Vista {

	constructor(app) {
		super(app);
		this.btnAdd = document.getElementById('add');
		this.btnDelete = document.getElementById('delete');
		this.btnAdd.onclick = () => {
			this.app.vAspirante.agregar();
			this.listar();
		}
		this.btnDelete.onclick = () => {
			this.app.vAspirante.eliminar();
			this.listar();

		}
		this.salida = document.getElementById('salida');
		this.template = this.salida.children[0].cloneNode(true);
		this.totalDescuento = document.getElementById('descuentos');
		this.max1 =  document.getElementById('max1');
		this.tot1 = document.getElementById('tot1');
		this.max2 = document.getElementById('max2');
		this.tot2 = document.getElementById('tot2');
		this.max3 = document.getElementById('max3');
		this.tot3 = document.getElementById('tot3');
	}

	listar() {

		while (this.salida.children[0] !== undefined) {
			
			this.salida.children[0].remove();
		}
		this.app.mAcademia.arrAspirante.forEach( (aspirante) => {
			
			let html = this.template.cloneNode(true);
			html.getElementsByClassName('id_asp')[0].innerHTML = aspirante.id;
			html.getElementsByClassName('nombre')[0].innerHTML = aspirante.nombre;
			html.getElementsByClassName('condicion')[0].innerHTML = aspirante.condicion;
			html.getElementsByClassName('curso')[0].innerHTML = aspirante.nombreCurso();
			html.getElementsByClassName('totalPagar')[0].innerHTML = `$${aspirante.totalPagar()}`;
			this.salida.appendChild(html);
		});
		this.max1.innerHTML = this.app.mAcademia.max1;
		this.max2.innerHTML = this.app.mAcademia.max2;
		this.max3.innerHTML = this.app.mAcademia.max3;
		this.tot1.innerHTML = this.app.mAcademia.cont1;
		this.tot2.innerHTML = this.app.mAcademia.cont2;
		this.tot3.innerHTML = this.app.mAcademia.cont3;
		this.totalDescuento.innerHTML = `$${this.app.mAcademia.totalDescuentos()}`;
	}
}

class App {

	constructor() {

		this.mAspirante = new Aspirante();
		this.mAcademia = new Academia();
		this.vAspirante = new vAspirante(this);
		this.vAcademia = new vAcademia(this);
		this.cargarDatos();
	}

	cargarDatos() {

		this.mAcademia.agregar(new Aspirante(1,"Mauricio", "no", 3));
		this.mAcademia.agregar(new Aspirante(2,"David", "si", 2));
		this.mAcademia.agregar(new Aspirante(3,"Margaret", "si", 3));
		this.mAcademia.agregar(new Aspirante(4,"Andrea", "no", 1));
		this.mAcademia.agregar(new Aspirante(5,"Carlos", "no", 3));
		this.vAcademia.listar();
	}
}

let app = new App();
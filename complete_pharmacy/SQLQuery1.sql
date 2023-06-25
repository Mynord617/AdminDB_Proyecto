CREATE DATABASE Complete_pharmacy;
use Complete_pharmacy;

CREATE TABLE Categorias(
	Id int NOT NULL,
	Nombre varchar(50) DEFAULT NULL,
	PRIMARY KEY (Id)
)

CREATE TABLE Descripcion_Producto(
	Id int NOT NULL,
	Id_categoria int NOT NULL,
	Nombre varchar(50) DEFAULT NULL,
	PRIMARY KEY(Id),
	CONSTRAINT fk_dp_c FOREIGN KEY (Id_categoria) REFERENCES Complete_pharmacy.dbo.Categorias(Id) 
)

CREATE TABLE Orden(
	Id int NOT NULL,
	PRIMARY KEY (Id)
)

CREATE TABLE Productos(
	Id int NOT NULL,
	Id_descr int NOT NULL,
	Id_orden int NOT NULL,
	PRIMARY KEY (Id),
	CONSTRAINT fk_p_d FOREIGN KEY (Id_descr) REFERENCES Complete_pharmacy.dbo.Descripcion_Producto(Id),
	CONSTRAINT fk_p_o FOREIGN KEY (Id_orden) REFERENCES Complete_pharmacy.dbo.Orden(Id)

)

CREATE TABLE Personas(
	Id int NOT NULL,
	primer_nombre varchar(50) DEFAULT NULL,
	primer_apellido varchar(50) DEFAULT NULL,
	edad int DEFAULT NULL,
	PRIMARY KEY(id)
)

CREATE TABLE Descr_personas(
	Id int NOT NULL,
	Id_persona int NOT NULL,
	PRIMARY KEY (Id),
	CONSTRAINT fk_d_p FOREIGN KEY (Id_persona) REFERENCES Complete_pharmacy.dbo.Personas(Id) 
)

CREATE TABLE Clientes(
	Id int NOT NULL,
	Id_descr int NOT NULL,
	PRIMARY KEY (Id),
	CONSTRAINT fk_cl_dsc FOREIGN KEY (Id_descr) REFERENCES Complete_pharmacy.dbo.Descr_personas(Id) 
)

CREATE TABLE Empleados(
	Id int NOT NULL,
	Id_descr int NOT NULL,
	PRIMARY KEY (Id),
	CONSTRAINT fk_em_dse FOREIGN KEY (Id_descr) REFERENCES Complete_pharmacy.dbo.Descr_personas(Id) 
)

CREATE TABLE Registro_clientes(
	Id int NOT NULL,
	Id_cliente int NOT NULL,
	Primary key (Id),
	CONSTRAINT fk_rc_cl FOREIGN KEY (Id_cliente) REFERENCES Complete_pharmacy.dbo.Clientes(Id) 
)

CREATE TABLE Registro_empl(
	Id int NOT NULL,
	Id_empl int NOT NULL,
	Primary key (Id),
	CONSTRAINT fk_re_em FOREIGN KEY (Id_empl) REFERENCES Complete_pharmacy.dbo.Empleados(Id) 
)

CREATE TABLE Orden_pedido(
	Id int NOT NULL,
	Id_empleado int NOT NULL,
	Id_cliente int NOT NULL,
	Id_orden int NOT NULL,
	Fecha date DEFAULT NULL,
	Cantidad int DEFAULT NULL,
	Primary key (Id),
	CONSTRAINT fk_op_c FOREIGN KEY (Id_cliente) REFERENCES Complete_pharmacy.dbo.Registro_clientes(Id), 
	CONSTRAINT fk_op_e FOREIGN KEY (Id_empleado) REFERENCES Complete_pharmacy.dbo.Registro_empl(Id), 
	CONSTRAINT fk_op_or FOREIGN KEY (Id_orden) REFERENCES Complete_pharmacy.dbo.Orden(Id) 
)

CREATE TABLE Lotes(
	Id int NOT NULL,
	Id_producto int NOT NULL,
	Cant_producto int DEFAULT NULL,
	PRIMARY KEY (Id),
	CONSTRAINT fk_l_pr FOREIGN KEY (Id_producto) REFERENCES Complete_pharmacy.dbo.Productos(Id)
)

CREATE TABLE Farmacias(
	Id int NOT NULL,
	Id_empleado int DEFAULT NULL,
	Id_lote int DEFAULT NULL,
	Id_pedidos int DEFAULT NULL,
	PRIMARY KEY (Id),
	CONSTRAINT fk_fr_emp FOREIGN KEY (Id_empleado) REFERENCES Complete_pharmacy.dbo.Empleados(Id), 
	CONSTRAINT fk_fr_lt FOREIGN KEY (Id_lote) REFERENCES Complete_pharmacy.dbo.Lotes(Id),
	CONSTRAINT fk_fr_pd FOREIGN KEY (Id_pedidos) REFERENCES Complete_pharmacy.dbo.Orden_pedido(Id)
)

CREATE TABLE Descr_Farmacia(
	Id_farmacia int NOT NULL,
	Nombre varchar(50) DEFAULT NULL,
	CONSTRAINT fk_df_f FOREIGN KEY (Id_farmacia) REFERENCES Complete_pharmacy.dbo.Farmacias(Id)
)
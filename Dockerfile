# ------------------------------ SQL 2022 ---------------------------------------
# Imagen de Docker Hub
FROM  mcr.microsoft.com/mssql/server:2022-latest AS SQL2022

# Variables de entorno del contenedor
ENV MSSQL_SA_PASSWORD=123456 ACCEPT_EULA=Y MSSQL_PID=Developer

# Puerto SQL
EXPOSE 1433

#  mssql://sa:123456@localhost/Complete_pharmacy

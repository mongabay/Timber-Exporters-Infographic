CREATE TABLE madera (
				origen text,
				destino text,
				empresa text,
				fob float8);

CREATE TABLE madera (
				origen text,
                anio text,
				fob float8,
				destino text,
				empresa text);

COPY madera(origen,anio,fob,destino,empresa) FROM '/home/jpmartinezv/workspace/newsapps/madera/madera-in-out.csv' CSV DELIMITER ',' HEADER;

select anio,destino,sum(fob) as total from madera where anio='2017' group by anio,destino order by total desc,anio limit 10;

select anio,empresa,sum(fob) as total from madera where anio='2017' group by anio,empresa order by total desc,anio limit 10;
select anio,sum(fob) as total from madera where empresa='Plantaciones de Balsa Plantabal S.A.' group by anio order by total desc,anio limit 10;

ALTER USER root with password 'root';

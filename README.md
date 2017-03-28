# ggs-ol3-demo-client
Proyecto de demostración de uso de [geowe-geometry-service](https://github.com/geowe/geowe-geometry-service).
Para poder visualizar el funcionamiento del Servicio de Operaciones Geométricas (GGS) he implementado los ejemplos de este repositorio.

Una vez desplegado el GGS, basta con abrir en el navegador el fichero ol3-demo.html, y seguir las instrucciones, para ver las diferentes operaciones geométricas.

### ¡ATENCIÓN! 
- No olvides configurar la url correcta donde has desplegado GGS, antes de ejecutar los ejemplos.
- CORS. GGS por defecto permite peticiones desde todods los orígenes.

## Operaciones sobre un elemento:
Los resultados de las operaciones se mostrarán en el mapa en color diferente. Si se produce un error mostrará un mensaje de alerta.
### Buffer
Calcula el buffer de 10 del elemento seleccionado en el mapa.

### Centroide
Calcula el centroide del elemento seleccionado en el mapa.

### Envelope
Calcula el rectángulo que envuelve (MBR) al elemento seleccionado en el mapa.


## Operaciones sobre varios elementos:
### Union
Calcula la unión geométrica de todos los elementos dibujados en el mapa. Si existen superposiciones de elementos se unirán en uno solo.

### Combine
Combina todos los elementos dibujados en el mapa, manteniendo sus límites vectoriales, es decir, si existen superposiciones se mantendrán los límites de cada elemento.

### Divide de previously combined element
Divide los elementos que se han combinado en el punto anterior. Por ejemplo: una entidad multi-polígono se divide en varios polígonos.


## Operaciones entre capas:
Se empleará una capa auxiliar de poligonos.

### Union
Calcula la unión geométrica entre la capa auxiliar y la capa de los elementos dibujados.

### Intersect
Calcula los elementos de la capa auxiliar que intersectan con los elementos dibujados.

### Intersection elements
Calcula la parte que intersecta de los elementos de la capa auxiliar con los elementos dibujados. Devolviendo varios elementos.

### Difference elements
Calcula la diferencia (la parte que no intersecta) de los elementos de la capa auxiliar con los elementos dibujados. Devolviendo varios elementos.

### Sym-Difference elements
Calcula la diferencia simétrica entre los elementos de la capa auxiliar y los elementos dibujados. Devolviendo varios elementos.

### Intersection
Calcula la intersección entre los elementos de la capa auxiliar y los elementos dibujados. Devolviendo un solo elemento.

### Difference
Calcula la diferencia (la parte que no intersecta) de los elementos de la capa auxiliar con los elementos dibujados. Devolviendo un solo elemento.

### Sym-Difference elements
Calcula la diferencia simétrica entre los elementos de la capa auxiliar y los elementos dibujados. Devolviendo un solo elemento.


## Operacions de división:

### Divide polygon
Divide un polígono en varios polígonos (indicadas por la línea de división).

### Divide linestring
Divide un linestring en varias líneas (indicadas por la línea de división).




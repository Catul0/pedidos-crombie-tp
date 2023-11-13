# Pedidos Crombie

## Descripción
'Pedidos Crombie' es una aplicación web de pedidos al estilo 'pedidos ya'. En esta aplicación, se pueden crear tres tipos de perfiles: 
- **Usuario**: Quien realiza pedidos de comida/productos.
- **Delivery**: Quien toma los pedidos y los entrega.
- **Vendedor**: Quien tiene menús y vende productos.

## Instalación
Para instalar y configurar el proyecto localmente, sigue estos pasos:
1. Ejecuta `npm install` en tu terminal.
2. Configura el archivo `.env` en tu localhost.
3. Ejecuta `npx migrate dev` en tu terminal.

## Uso

### Usuario
Los usuarios pueden registrarse en la aplicación haciendo clic en "Registrar". Una vez registrados, pueden buscar comida o locales y agregar productos a su carrito. El carrito puede ser editado en cualquier momento. Cuando el usuario esté listo para realizar su pedido, puede proceder al "Checkout". En el "Checkout", el usuario confirma su compra, que luego es enviada al vendedor.

### Vendedor
El vendedor recibe la compra y tiene la opción de aceptarla o declinarla. Si la acepta, prepara el pedido y actualiza el estado del mismo en la aplicación. Una vez que el pedido está listo para ser entregado, los repartidores pueden verlo y asignárselo para su entrega. Los vendedores pueden registrarse de la misma manera que los usuarios, pero para comenzar a vender deben tener al menos tres menús cargados en la aplicación.

### Repartidor
Los repartidores pueden ver los pedidos que están listos para ser entregados y asignarse a ellos para su entrega. Los repartidores pueden registrarse de la misma manera que los usuarios, pero para comenzar a entregar deben tener un vehículo cargado en la aplicación.

## Contribución
Estamos abiertos a contribuciones. Si tienes alguna idea o mejora, no dudes en hacer un pull request.

## Licencia
Este proyecto está bajo una licencia de uso con créditos a los creadores.

## Contacto
Si tienes alguna pregunta o sugerencia, no dudes en ponerte en contacto con nosotros.

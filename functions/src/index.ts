import * as functions from 'firebase-functions';

//Import Express
const express = require('express');
const app = express();

// CORS
const cors = require('cors');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cors()) // Add cors

//Axios
const axios = require('axios');

// Utils
import { Utils } from './util/utils';

// Const
import { HTTP_PROTOCOL, CATALOGS_SERVER, SECURITY_SERVER } from './data/global.data';

// Url Server Catalogos -> Seguridades
const url_server_user = `${ HTTP_PROTOCOL }://${ CATALOGS_SERVER }`;
const url_server_security = `${ HTTP_PROTOCOL }://${ SECURITY_SERVER }`;

app.post('*', async ( req: any, res: any ) => {

    if ( !req.body.user_id ) 
        res.status( 404 ).send( "Not Found" );

    let user_id = req.body.user_id;
    let system_id = req.body.system_id;
    let profile = req.body.profile;

    console.log(user_id, system_id, profile);

    /* ************************
     * CONSULTAR DIRECCION
    ************************ */
   const url_user = `${ url_server_user }/users/${ user_id }`;
   await axios.get(`${ url_user }.json`).then( async ( request: any ) => {

        if ( !request.data )
            res.status( 404 ).send( "Not Found" );

        if( request.data.business ) {

            let user = request.data;
            let brands: any[] = [];

            Utils.convert_to_array( user.business ).forEach( business => {
                Utils.convert_to_array( business.brands ).forEach( brand => {
                    brands.push({
                        business_id: business.id,
                        brand_id: brand.id,
                        name: brand.name,
                        image: brand.image
                    });
                });
            });

            let navigations: any[] = [];
            let url_navigation = `${ url_server_security }/systems/${ system_id }/profiles/${ profile }`;
            await axios.get(`${ url_navigation }.json`).then( async ( nav: any ) => {
                
                //console.log("Nav", nav.data);
                navigations = nav.data;
                
            });
            
            res.send({ 
                brands: brands,
                navigations: navigations
            });

        } else {
            res.status( 403 ).send( "you do not have access configured, contact the system administrator." );
        }

   });

});

const access_permission = functions.https.onRequest( app );

exports.api = { access_permission };

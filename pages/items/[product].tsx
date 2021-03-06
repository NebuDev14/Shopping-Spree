// @ts-nocheck
import React from "react";
import axios from "axios";
import Link from "next/link";

import Map from "../../components/Map";

export default function productResult(props: any) {

    return  (
        <div>
            <div className="container">
                <img src={props.information.product_results.media[0].link} className="image"/>
                <div className="info">
                    <span className="title">{props.information.product_results.title}</span>
                    <h2 className="price">{props.information.product_results.prices[0]}</h2>
                    <h2 className="rating">Rating: {props.information.product_results.rating}/5</h2>
                    <h2 className="reviewNum">Number of reviews: {props.information.product_results.reviews}</h2>
                    <h2 className="seller">Seller: {props.information.sellers_results.online_sellers[0].name}</h2>
                    <Link href={props.information.sellers_results.online_sellers[0].link}>
                        <button className="btn">Purchase</button>
                    </Link>
                </div>  
            </div>
            <div className="descDiv">
                <p className="desc">{props.information.product_results.description}</p>
            </div>
            <h2 className="nearby">You can buy this product at</h2>
            <div className="mapDiv">
                <Map lat={props.locationData.geometry.location.lat} lng={props.locationData.geometry.location.lng} />
            </div>
                <style jsx>{`
                    .container {
                        display: flex;
                        align-items: center;
                        justify-content: space-evenly;
                        padding: 5rem;
                        text-align: center;
                    }
                    
                    .image {
                        border: 5px solid #000;
                        border-radius: 20px;
                        text-align: center;
                        margin: 0 2rem 0 2rem;
                    }

                    .info {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        flex-direction: column;
                    }

                    .title {
                        color: var(--primary-color);
                        border-bottom: 2px solid var(--primary-color);
                        font-size: 170%;
                    }

                    .price {
                        font-size: 200%;
                    }

                    .btn {
                        padding:10px;
                        border:none;
                        background-color: var(--primary-color);
                        color: #fff;
                        font-weight: 400;
                        border-radius: 20px;
                        margin: 5px;
                        margin-top: 3rem;
                        width:25%;
                        height: 2.5rem;
                        align-items: center;
                        transition-duration: 0.4s;  
                        font-size: 110%;  
                    }
            
                    .btn:hover {
                        box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
                        transform: scale(1.02);
                        cursor: pointer;
                    }

                    .desc {
                        font-size: 130%;
                        padding: 4rem;
                    }

                    .nearby {
                        text-align: center;
                    }

                `}</style>
        </div>
    );
}

export const getServerSideProps: any = async (context: any) => {
    // getting product information using product ID
    var information;
    const {product} = context.params;
    await (async () => {
        const itemInfo = await axios({
            method: 'GET',
            url: `https://serpapi.com/search.json?device=desktop&engine=google_product&gl=us&google_domain=google.com&hl=en&location=NY&product_id=${product}&key=${process.env.KEY}`
        });
        information = itemInfo.data;
    })();

    // getting nearby store
    var locationData;
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=40.712776,-74.005974&radius=5000&keyword=${information.sellers_results.online_sellers[0].name}&key=${process.env.NEXT_PUBLIC_MAP_KEY}`;
    await (async () => {
        const locationInfo = await axios({
            method: 'GET',
            url: url
        });
        locationData = locationInfo.data.results[0];
    })();

    console.log(locationData);

    return {
        props: {
            information, locationData
        }
        
    }
}

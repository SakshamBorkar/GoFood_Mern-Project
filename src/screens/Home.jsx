import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';

export default function Home() {
    const [search, setSearch] = useState('');
    const [foodCat, setFoodCat] = useState([]);
    const [foodItem, setFoodItem] = useState([]);

    const loadData = async () => {
        try {
            let response = await fetch("http://localhost:3001/api/foodData", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            // console.log('Data fetched:', data);

            if (Array.isArray(data) && data.length >= 2) {
                setFoodItem(data[0]);
                setFoodCat(data[1]);
            } else {
                throw new Error('Invalid data format received');
            }
        } catch (error) {
            console.error('Error loading food data:', error);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    // console.log('Food Categories:', foodCat); // Log foodCat globally
    // console.log('Food Items:', foodItem);     // Log foodItem globally

    return (
        <div>
            <div><Navbar /></div>

            <div>
                <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
                    <div className="carousel-inner" id='carousel'>
                        <div className="carousel-caption" style={{ zIndex: "10" }}>
                            <div className="d-flex justify-content-center">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{
                                    setSearch(e.target.value);
                                }}/>
                                {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
                            </div>
                        </div>
                        <div className="carousel-item active">
                            <img src="https://picsum.photos/300" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://picsum.photos/200/300" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://picsum.photos/200" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>

            <div className='container m-3'>
                {foodCat.length > 0 ? (
                    foodCat.map((data) => {
                        // console.log('Category:', data.CategoryName); // Log categories being iterated
                        return (
                            <div className='row mb-3' key={data._id}>
                                <div className='fs-3 m-3'>
                                    {data.CategoryName}
                                </div>
                                <hr />
                                <div className='row'>
                                    {foodItem.length > 0 ? (
                                        foodItem
                                            .filter((item) => {
                                                const isMatch = (item.CategoryName === data.CategoryName) && item.name.toLowerCase().includes(search.toLowerCase()); // Changed item.Name to item.name
                                                // console.log('Matching Item:', item, 'Match:', isMatch); // Log filtered items
                                                return isMatch;
                                            })
                                            .map(filterItems => {
                                                return (
                                                    <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                                                        <Card
                                                            foodItem ={filterItems}
                                                            options={filterItems.options[0]}
                                                            imgSrc={filterItems.img}
                                                        />
                                                    </div>
                                                )
                                            })
                                    ) : (
                                        <div>No such data found</div>
                                    )}
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div>Loading categories...</div>
                )}
            </div>
            <Footer />
        </div>
    );
}

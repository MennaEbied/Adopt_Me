import { useParams } from "react-router-dom";
import { useState,lazy,Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import fetchPet from "./fetchPet";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";

const Modal=lazy(()=>import('./Modal'))
const Details = () => {
  const[showModal,setShowModal]=useState(false)
  const{id}=useParams();
  const results=useQuery(["details",id],fetchPet)

  if(results.isLoading){
    return(
    <div className="loading-pane">
      <h2 className="loader">🌀</h2>
    </div>
    )
  }


  const pet=results.data.pets[0];
   
    return(
      <div className="details">
        <Carousel images={pet.images}/>
        <div>
          <h1>{pet.name}</h1>
          <h2>
            {`${pet.animal}-${pet.breed}-${pet.city},${pet.state}`}
            <button onClick={()=>setShowModal(true)}>Adopt {pet.name}</button>
            <p>{pet.description}</p>
            {
              showModal?
              (
                <Modal>
                  <div>
                    <h1>Would you like to adopt {pet.name}</h1>
                    <div className="buttons">
                      <button>Yes</button>
                      <button onClick={()=>setShowModal(false)}>No</button>
                    </div>
                  </div>
                </Modal>
              ):null}
          </h2>
        </div>
      </div>
    );
  };
  
  export default function DetailsErrorBoundary(props){
    return(
      <ErrorBoundary>
        <Details {...props}/>
      </ErrorBoundary>
    )
  }

  
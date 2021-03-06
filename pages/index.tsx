import { useRouter } from 'next/router';
import React from 'react';

export default function Home() {
  const router = useRouter();

  const redirectSearch = async (event: any) => {
    event.preventDefault();
    const query = event.target.name.value;
    const path = `/results/${query}`;
    router.push(path);
  }

  return (
    <div className="container">
      <h1 className="title">Shopping Spree</h1>
      <form onSubmit={redirectSearch} className="formContainer">
        <label htmlFor="name" className="titleLabel">What are you looking for?</label>
        <div className="submitArea">
          <input id="name" name="name" type="text" autoComplete="off" className="textBox" required />
          <button type="submit" className="btn">Search</button>
        </div>
      </form>

      <style jsx>{`
        .container {
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column; 
        }

        .title {
          font-size: 400%;
          color: var(--primary-color);
        }

        .formContainer {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column; 
        }

        .titleLabel {
          font-size: 220%;
          margin: 2rem 0 2rem 0;
        }

        .textBox {
          width: 70%;
          height: 2.5rem;
          margin: 2rem 0 2rem 0;
          border-radius: 20px 0 0 20px;
          outline: 0;
          font-size: 110%;  
        }

        .btn {
          padding:10px;
          border:none;
          background-color: var(--primary-color);
          color: #fff;
          font-weight: 400;
          border-radius: 0 20px 20px 0;
          margin: 5px;
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

        .submitArea {
          width: 100%;
        }

      `}</style>
    </div>
  )
}


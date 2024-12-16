import React from "react";

function Home() {
  return (
    <div className="container text-center mt-5">
      <div className="alert alert-primary" role="alert">
        <h1 className="alert-heading">Welcome to the Skate Shop!</h1>
        <p>Your one-stop shop for all things roller skates!</p>
      </div>
      <img
        src="https://previews.123rf.com/images/sirup/sirup1608/sirup160800055/61954691-black-outline-single-roller-skate-cartoon-illustration-seventies-vector-icon-isolated-on-white.jpg"
        alt="Skate Shop Logo"
        className="img-fluid mb-4"
        style={{ maxWidth: "200px" }}
      />
      <p className="lead">
        Explore our wide range of roller skates and accessories. We’ve got
        something for everyone!
      </p>
    </div>
  );
}

export default Home;

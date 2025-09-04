import { useAuth } from "../store/auth";
function Service() {
  const { services } = useAuth(); // 👈 make sure your context provides services
  console.log(services);

  return (
    <section className="section-services">
      <div className="container">
        <h1 className="main-heading">Our Services</h1>
      </div>

      <div className="container grid grid-three-cols">
        {services &&
          services.map((currEle, index) => {
            const { price, description, provider, service } = currEle;

            return (
              <div className="card" key={index}>
                <div className="card-img">
                  <img src="/services.png" alt="service" width="300" />
                </div>
                <div className="card-details">
                  <div className="grid grid-two-cols">
                    <p className="provider">{provider}</p>
                    <p className="price">{price}</p>
                  </div>
                  <h2 className="service-title">{service}</h2>
                  <p className="service-desc">{description}</p>
                </div>
              </div>
            );
          })}
      </div>
    </section>
  );
}

export default Service;

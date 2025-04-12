const ExperienciaReelsInstagram = ({ data }) => {
    if (!data) return null;
  
    const { titulo, parrafo, reel } = data;
  
    return (
      <section id="experiencia" className="py-16 bg-white text-gray-800">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            {titulo}
          </h2>
  
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="text-left md:text-lg leading-relaxed font-medium">
              {parrafo?.titulo && <p className="text-2xl font-semibold mb-4">{parrafo.titulo}</p>}
              {parrafo?.descripcion && <p className="mb-4">{parrafo.descripcion}</p>}
              {parrafo?.fraseFinal && <p className="italic text-red-600">{parrafo.fraseFinal}</p>}
            </div>
  
            {reel && (
              <div className="flex justify-center">
                <iframe
                  src={reel}
                  width="320"
                  height="480"
                  frameBorder="0"
                  scrolling="no"
                  allowTransparency="true"
                  allow="encrypted-media"
                  className="rounded-xl shadow-md"
                ></iframe>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  };
  
  export default ExperienciaReelsInstagram;
  
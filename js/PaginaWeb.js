export default class PaginaWeb {
    #imageBanner;
    #images;
    #sections;

    constructor() {
        this.#imageBanner = "./imgs/banner.png";
        this.#images = this.#getImages();
        this.#sections = this.#generateSections();
    }

    #getImages() {
        const images = [];
        const path = './imgs/';
        const files = ['imagen1.jpg', 'imagen2.jpg', 'imagen3.jpg', 'imagen4.jpg', 'imagen5.jpg'];

        for (const file of files) {
            const name = file.split('.')[0];
            const pathFile = path + file;
            images.push({ name, pathFile });
        }

        return images;
    }

    #generateSections() {
        const header = $('<header>').addClass('container mx-auto flex flex-col');
        const banner = $('<div>').addClass('w-full');
        const bannerImg = $('<img>').attr('src', this.#imageBanner).attr('alt', 'Banner').addClass('w-screen h-[10rem] object-cover');
        banner.append(bannerImg);
        header.append(banner);

        const main = $('<main>').addClass('container mx-auto flex flex-col items-center');

        // Carrusel
        const carouselContainer = $('<div>').addClass('relative w-full overflow-hidden');
        const carouselInner = $('<div>').addClass('flex transition-transform duration-500 ease-in-out w-full');
        let currentIndex = 0;
        let intervalId;

        for (const image of this.#images) {
            const carouselItem = $('<div>').addClass('w-full flex-shrink-0 flex items-center justify-center').css('min-width', '100%');
            const img = $('<img>').attr('src', image.pathFile).attr('alt', image.name).addClass('max-w-full max-h-[500px] mx-auto');
            carouselItem.append(img);
            carouselInner.append(carouselItem);
        }

        carouselContainer.append(carouselInner);
        main.append(carouselContainer);

        // Botones de navegación del carrusel
        const prevButton = $('<button>').addClass('absolute top-1/2 left-2 transform -translate-y-1/2 bg-blue-400 p-2 hover:bg-blue-500 hover:text-gray-100 transition-all duration-300').text('❮');
        const nextButton = $('<button>').addClass('absolute top-1/2 right-2 transform -translate-y-1/2 bg-blue-400 p-2 hover:bg-blue-500 hover:text-gray-100 transition-all duration-300').text('❯');
        carouselContainer.append(prevButton, nextButton);

        // Navbar
        const navbar = $('<nav>').addClass('w-full flex flex-row gap-2 bg-blue-400 mt-4');
        for (let i = 0; i < this.#images.length; i++) {
            const button = $('<button>').addClass('bg-blue-400 p-2 hover:bg-blue-500 hover:text-gray-100 transition-all duration-300')
                .text(this.#images[i].name)
                .attr('data-index', i);
            button.on('click', () => showSlide(i));
            navbar.append(button);
        }
        header.append(navbar);

        // Funciones para controlar el carrusel
        const showSlide = (index) => {
            index = (index + this.#images.length) % this.#images.length;
            carouselInner.css('transform', `translateX(-${index * 100}%)`);
            currentIndex = index;
        };

        const nextSlide = () => {
            showSlide(currentIndex + 1);
        };

        prevButton.on('click', () => {
            clearInterval(intervalId);
            showSlide(Math.max(currentIndex - 1, 0));
        });

        nextButton.on('click', () => {
            clearInterval(intervalId);
            nextSlide();
        });

        // Iniciar el carrusel automático
        intervalId = setInterval(nextSlide, 3000);

        // Detener el carrusel al pasar el mouse sobre él
        carouselContainer.hover(
            () => clearInterval(intervalId),
            () => intervalId = setInterval(nextSlide, 3000)
        );

        const footer = $('<footer>').addClass('container mx-auto flex flex-row mt-4');
        const p = $('<p>').addClass('w-full bg-blue-400 text-center text-2xl font-bold').text('Pablo R. De La Cruz 2024');
        footer.append(p);

        return [header, main, footer];
    }

    getSelections() {
        return this.#sections;
    }
}

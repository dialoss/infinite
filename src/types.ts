interface IApp {
    alert: (data) => any;
    openModal: (data) => any;
    closeModal: () => void;
    navigate: (url: string) => void;
}

declare global {
    interface Window {
        app: IApp
    }
}

window.app = {
    alert: () => {},
    closeModal: () => {},
    navigate: () => {},
    openModal: () => {}
};
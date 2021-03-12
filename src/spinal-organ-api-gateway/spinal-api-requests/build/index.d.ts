declare function Requests(logger: any): {
    run: (port: number, host?: string) => void;
    getSwaggerDocs: () => Object;
};
export default Requests;

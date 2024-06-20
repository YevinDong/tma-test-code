import { EthereumSepolia, SolanaDevnet } from "@particle-network/chains";

export const particleProjectConfig = {
    projectId: "cf7afbed-bb50-4e34-9fed-d006b12acf10",
    clientKey: "cZOpVtuzchh7LaMoomz5CM2ZoGcurGOZayyKHGsb",
    appId: "2c6df3c7-30d9-4704-bd88-75e13b46fb76",
};

export const particleWalletConfig = {
    visible: true,
    customStyle: {
        supportChains: [SolanaDevnet, EthereumSepolia],
    },
};

export const style: Record<string, React.CSSProperties> = {
    main: {
        display: "flex",
        flexDirection: "column",
        gap: ".3vw",
    },
};
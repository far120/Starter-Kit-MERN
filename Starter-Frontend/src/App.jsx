import AppComponant from "./app/App";
import Providers from "./app/providers";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";


const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Providers>
        <AppComponant />
      </Providers>
    </QueryClientProvider>
  );
}

export default App;
import React, {lazy, Suspense} from "react";
import Spinner from "./Spinner";

export const Async = Component => props => (
  <Suspense fallback={<Spinner />}>
    <Component {...props} />
  </Suspense>
);

export const lazyImport = filepath => lazy(() => import(`${filepath}`));

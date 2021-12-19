import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router";
import { InternalServerError } from "../components/Errors/InternalServerError";
import { NotFoundError } from "../components/Errors/NotFoundError";

export const ErrorHandler = ({ children }: any) => {
	const location = useLocation()

	console.log(location)

	// switch (location.state.errorStatusCodes)) {
	// 	case 404:
	// 		return <NotFoundError link="/explore" />
	// 	case 400:
	// 		return <NotFoundError link="/explore" />
	// 	case 500:
	// 		return <InternalServerError onClick={() => ""} />
	// 	default:
	// 		return children
	// }

	return children
}


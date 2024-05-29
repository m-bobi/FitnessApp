import {jwtDecode} from 'jwt-decode';

export function decodeToken(token) {
    const decodedToken = jwtDecode(token);
    const name = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
    const role = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

    return { name, role };
}
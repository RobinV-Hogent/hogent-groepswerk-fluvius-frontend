import React, {
  useState,
  createContext,
  useCallback,
  useMemo,
  useContext,
  useEffect,
} from "react";
import * as roleApi from "../backend/api/roles";
import { useSession } from "./user-context";

export const Role_Context = createContext();
export const useRole = () => useContext(Role_Context);

export const Role_Provider = ({ children }) => {
  const { ready: authReady } = useSession();
  const [allRoles, setAllRoles] = useState([]);
  const [selected_role, setselected_Role] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [initialLoad, setInitialLoad] = useState(false);
  const [allRolesPerson, setAllRolesPerson] = useState([]);

  // alles ophalen van data
  const fetchAlRoles = useCallback(async () => {
    try {
      setError({});
      setLoading(true);
      const data = await roleApi.getAllRoles();
      console.log("roles", data.data);
      setAllRoles(rollenToDutch(data.data));
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchAllRolesPerson = useCallback(async () => {
    try {
      setError({});
      setLoading(true);
      const data = [
        { id: 1, person: true },
        { id: 2, person: false },
        { id: 3, person: true },
        { id: 4, person: false },
      ];
      console.log("person", data);
      setAllRolesPerson(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  });

  const dutch_names = {
    mvo_coordinator: "Mvo-coördinator",
    director: "Directie",
    stakeholder: "Stakeholder",
    management: "Manager",
  };

  const rollenToDutch = useCallback((rollen) => {
    rollen.map((e) => (e.dutch_name = dutch_names[e.name]));
    return rollen;
  }, []);

  // initieele fetch van de data
  // dit wordt een keer opgeroepen
  useEffect(() => {
    if (authReady && !initialLoad) {
      fetchAlRoles();
      fetchAllRolesPerson();
      setInitialLoad(true);
    }
  }, [authReady, initialLoad, fetchAlRoles, fetchAllRolesPerson]);

  // alle data die beschikbaar moet zijn voor de componenten
  const value = useMemo(
    () => ({
      selected_role,
      setselected_Role,
      allRoles,
      allRolesPerson,
      error,
      loading,
    }),
    [selected_role, allRoles, allRolesPerson, error, loading]
  );

  return (
    <Role_Context.Provider value={value}>{children}</Role_Context.Provider>
  );
};

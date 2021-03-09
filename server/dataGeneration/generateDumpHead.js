const fs = require('fs');
const path = require('path');

let query = `
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;


CREATE TABLE public.reviews (
    id integer NOT NULL,
    author character varying(50),
    date date,
    rating integer,
    content character varying(255),
    spaceid integer
);


ALTER TABLE public.reviews OWNER TO "user";

CREATE SEQUENCE public.reviews_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.reviews_id_seq OWNER TO "user";

ALTER SEQUENCE public.reviews_id_seq OWNED BY public.reviews.id;

ALTER TABLE ONLY public.reviews ALTER COLUMN id SET DEFAULT nextval('public.reviews_id_seq'::regclass);


`;

fs.writeFile(path.join(__dirname, '..', 'dumps', 'head.sql'), query, (err) => {
    if (err) throw err;

    console.log('DONE!');
});

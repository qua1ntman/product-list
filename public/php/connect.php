<?php

    class Dtbshst {
        private $host = "localhost";
        private $user = "id18153491_ashla_db";
        private $pwd = "t^-h!{p%m6d4LElE";
        private $dbName = "id18153491_product_list";

        protected function connect()
        {
            $conn = new mysqli($this->host, $this->user, $this->pwd, $this->dbName);
            return $conn;

        }
    }
?>
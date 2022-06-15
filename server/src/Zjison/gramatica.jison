%{

    //codigo en JS
    //importaciones y declaraciones
    const {Declaracion} = require('../instrucciones/declaracion');
    const {Literal} = require('../expresiones/literal')
    const {Type} = require('../symbols/type');
    const {Arithmetic} = require('../expresiones/aritmeticas');
    const {Acceso} = require('../expresiones/Acceso');
    const {ArithmeticOption} = require('../expresiones/aritmeticOption');
    const {Bloque} = require('../instrucciones/Env')
    const {Imprimir} = require('../instrucciones/imprimir')
    var array_erroresLexicos;

%}

%lex
%options case-insensitive

number [0-9]+
cadena "\"" [^\"]* "\""
bool    "true"|"false"    

%%





\s+                   /* skip whitespace */
"//".*                // comentario simple línea
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/] // comentario multiple líneas




//expresiones regulare
{number}    return 'expreR_numero'
{cadena}    return 'expreR_cadena'
{bool}      return 'expreR_bool'




//palabras reservadas

"var"   return 'pr_var'
"let"   return 'pr_let'
"const" return 'pr_const'

"numero" return 'pr_numero'
"string" return 'pr_string'
"bool" return 'pr_bool'
"print" return 'pr_print'


//simbolos

";" return ';' 
"=" return '='
":" return ':' 
"+" return '+' 
"-" return '-' 
"*" return '*' 
"/" return '/' 

"{" return '{' 
"}" return '}' 
")" return ')' 
"(" return '(' 



[a-zA-ZñÑ][a-zA-Z0-9_ñÑ]*	return 'id';


<<EOF>>		            return 'EOF'

.   { 
        //llamada al singleton con getinstance
        // variable.add_error("kfdsa")
        console.log("error lexico :"+yytext)
        //push para array errores
    }

/lex 

%left '*' '/'
%left '+' '-'

%start INIT


%%

 
 
 

INIT: INSTRUCCIONES    EOF {return $1} ;


INSTRUCCIONES :   INSTRUCCIONES INSTRUCCION { $1.push($2); $$=$1;}
              |   INSTRUCCION               { $$ = [$1] }
              ;


INSTRUCCION : DECLARACION   { $$=$1; } 
            | BLOQUE        { $$=$1; } 
            | IMPRIMIR      { $$=$1; } 

            | error    ';'  { 
                //get instance
                //meterlo
                console.log("Error sintactico en la linea"+(yylineno+1)); }
;

IMPRIMIR : 'pr_print' '(' E ')' ';' { $$= new Imprimir($3,@1.first_line, @1.first_column);}
;


BLOQUE: '{' INSTRUCCIONES  '}'  {$$= new Bloque($2,@1.first_line, @1.first_column)}
;

TIPO_DECLARACION: 'pr_const' |'pr_let' | 'pr_var' ; 
TIPODATO_DECLARACION  :  'pr_numero' {$$=$1;}  
                       | 'pr_bool'   {$$=$1;}
                       | 'pr_string' {$$=$1;}
                       ; 

DECLARACION : TIPO_DECLARACION 'id' ':' TIPODATO_DECLARACION '=' E ';' 
            {
                $$= new Declaracion($2,$4,$6,@1.first_line, @1.first_column );
            }
            ;


E: E '+' E  {$$= new Arithmetic($1,$3,ArithmeticOption.MAS, @1.first_line, @1.first_column);}
|  E '-' E  {$$= new Arithmetic($1,$3,ArithmeticOption.MENOS, @1.first_line, @1.first_column);}  
|  E '*' E  {$$= new Arithmetic($1,$3,ArithmeticOption.MULTIPLICACION, @1.first_line, @1.first_column);}
|  E '/' E  {$$= new Arithmetic($1,$3,ArithmeticOption.DIV, @1.first_line, @1.first_column);}
|  'id'     {$$= new Acceso($1,@1.first_line, @1.first_column);}
|  F    {$$=$1;}
;

F: expreR_numero   {$$=new Literal($1,Type.NUMBER , @1.first_line, @1.first_column)}
    |expreR_bool   {$$=new Literal($1,Type.BOOLEAN, @1.first_line, @1.first_column)}
    |expreR_cadena {$$=new Literal($1,Type.STRING , @1.first_line, @1.first_column)}
;



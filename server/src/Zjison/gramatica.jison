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
    const {Sentencia_if} = require('../instrucciones/condicionIf')
    const {metodo} = require('../instrucciones/metodo')
    var array_erroresLexicos;

%}

%lex
%options case-insensitive

number ["-"]?[0-9]+
double ["-"]?[0-9]*("."[0-9]+)
char [\'][^\']?[\']
incremento [\-\-]|[\+\+]
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
{double} return 'expreR_double'
{char} return 'expreR_char'
{incremento} return 'expreR_incremento'



//palabras reservadas
"int" return 'pr_int'
"string" return 'pr_string'
"double" return 'pr_double'
"boolean" return 'pr_boolean'
"char" return 'pr_char'
"const" return 'pr_const'
"let" return 'pr_let'
"var" return 'pr_var'
"if" return 'pr_if'
"else" return 'pr_else'
"switch" return 'pr_switch'
"case" return 'pr_case'
"break" return 'pr_break'
"for" return 'pr_for'
"while" return 'pr_while'
"do" return 'pr_do'
"continue" return 'pr_continue'
"void" return 'pr_void'
"call" return 'pr_call'
"return" return 'pr_return'
"println" return 'pr_println'
"print" return 'pr_print'
"type" return 'pr_type'
"new" return 'pr_new'
'default' return 'pr_default'

//simbolos
";" return ';'
"," return ','
"(" return '('
")" return ')'
"{" return '{'
"}" return '}'
":" return ':'
"=" return '='

"+" return '+'
"-" return '-'
"*" return '*'
"+" return '+'
"/" return '/'
"%" return '%'

"**" return '**'
"<=" return '<='
"<" return '<'
">=" return '>='
">" return '>'
"!=" return '!='
"==" return '=='
"||" return '||'
"&&" return '&&'
"^" return '^'





[a-zA-ZñÑ][a-zA-Z0-9_ñÑ]*	return 'id';


<<EOF>>		            return 'EOF'

.   { 
        //llamada al singleton con getinstance
        // variable.add_error("kfdsa")
        console.log("error lexico :"+yytext)
        //push para array errores
    }

/lex 
%left '**'
%left '!'
%left '*' '/' '%'
%left '+' '-'
%left '>' '<' '>=' '<=' '==' '!='
%left '^'
%left '&&'
%left '||'
%start INIT


%%

 
 
 

INIT: INSTRUCCIONES    EOF {return $1} ;


INSTRUCCIONES :   INSTRUCCIONES INSTRUCCION { $1.push($2); $$=$1;}
              |   INSTRUCCION               { $$ = [$1] }
              ;


INSTRUCCION : DECLARACION   { $$=$1; } 
            | BLOQUE        { $$=$1; } 
            | IMPRIMIR      { $$=$1; } 
            | CONDICIONIF   { $$=$1; } 
            | METODOS       { $$=$1; } 

            | error    ';'  { 
                //get instance
                //meterlo
                console.log("Error sintactico en la linea"+(yylineno+1)); }
;

METODOS:  'pr_void' 'id' '(' /*parametros*/   ')' BLOQUE {$$= new metodo($2,null,$5,@1.first_line, @1.first_column );} 
;


CONDICIONIF: 'pr_if' '(' EXPRESIONES ')' BLOQUE 'pr_else' BLOQUE  { console.log("reconoci una sentencia if");
                                                        $$= new Sentencia_if( $3, $5,$7,@1.first_line, @1.first_column);}
;

IMPRIMIR : 'pr_print' '(' EXPRESIONES ')' ';' { $$= new Imprimir($3,@1.first_line, @1.first_column);}
;


BLOQUE: '{' INSTRUCCIONES  '}'  {$$= new Bloque($2,@1.first_line, @1.first_column)}
;

TIPO_DECLARACION: 'pr_const' |'pr_let' | 'pr_var' ; 
TIPODATO_DECLARACION  :  'pr_numero' {$$=$1;}  
                       | 'pr_bool'   {$$=$1;}
                       | 'pr_string' {$$=$1;}
                       | 'pr_char' {$$=$1;}
                       | 'pr_double' {$$=$1;}
                       ; 

DECLARACION : TIPO_DECLARACION TIPODATO_DECLARACION 'id' '=' EXPRESIONES ';' 
            {
                $$= new Declaracion($3,$2,$5,@1.first_line, @1.first_column );
            }
            ;


EXPRESIONES: EXPRESIONES '+' FA  {$$= new Arithmetic($1,$3,ArithmeticOption.MAS, @1.first_line, @1.first_column);}
|  EXPRESIONES '-' FA  {$$= new Arithmetic($1,$3,ArithmeticOption.MENOS, @1.first_line, @1.first_column);}  
|  EXPRESIONES '*' FA  {$$= new Arithmetic($1,$3,ArithmeticOption.MULTIPLICACION, @1.first_line, @1.first_column);}
|  EXPRESIONES '/' FA  {$$= new Arithmetic($1,$3,ArithmeticOption.DIV, @1.first_line, @1.first_column);}
|  EXPRESIONES '%' FA  {$$= new Arithmetic($1,$3,ArithmeticOption.MODULO, @1.first_line, @1.first_column);}
|  EXPRESIONES '**' FA  {$$= new Arithmetic($1,$3,ArithmeticOption.PORPOR, @1.first_line, @1.first_column);}  
;
FA:
'id'     {$$= new Acceso($1,@1.first_line, @1.first_column);}
|  F    {$$=$1;}
;


F: expreR_numero   {$$=new Literal($1,Type.NUMBER , @1.first_line, @1.first_column)}
    |expreR_bool   {$$=new Literal($1,Type.BOOLEAN, @1.first_line, @1.first_column)}
    |expreR_char {$$=new Literal($1,Type.CHAR , @1.first_line, @1.first_column)}
    |expreR_double {$$=new Literal($1,Type.DOUBLE , @1.first_line, @1.first_column)}
    |expreR_cadena {$$=new Literal($1,Type.STRING , @1.first_line, @1.first_column)}
;



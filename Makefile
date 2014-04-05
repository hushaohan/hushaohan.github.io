target = cv

all: $(target).pdf

$(target).pdf:
	latexmk -pdf -pdflatex="pdflatex -shell-escape -interaction=nonstopmode -file-line-error --synctex=1" -use-make $(target)

clean:
	latexmk -C -bibtex
	rm -f $(target).synctex.gz .DS_Store

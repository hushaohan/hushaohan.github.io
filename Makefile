all: resume.pdf

resume.pdf: *.tex
	pdflatex --shell-escape --synctex=1 resume
#	bibtex resume
#	pdflatex --shell-escape --synctex=1 resume
#	pdflatex --shell-escape --synctex=1 resume

clean:
	rm -f *.bak
	rm -f *~
	rm -f *.pdf *.log *.aux *.bbl *.blg \#* *.dvi *.gz *.out
